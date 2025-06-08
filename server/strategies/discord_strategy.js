import passport from "passport"
import { Strategy } from 'passport-discord'
import User from "../Models/User.models.js"

passport.serializeUser((user, done) => {
    console.log('Inside Serialize User')
    console.log(user.id)
    done(null, user.id)
})

passport.deserializeUser( async (id, done) => {
    try {
        const findUser = await User.findById(id)
        return findUser ? done(null, findUser) : done(null, null)
    } catch(err) {
        return done(err, null)
    }
})

export default passport.use(
    new Strategy ({
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/api/user/discord/redirect',
        scope: ['identify', 'guilds', 'email'],
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(`Token: ${accessToken}`)
        let findUser;
        try {
            findUser = await User.findOne({ providerId: profile.id })
        } catch (err) {
            return done(err, null)
        }

        try {
            if(!findUser) {
                const newUser = new User ({
                    name: profile.username,
                    email: profile.email,
                    avatar: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
                    authProvider: 'discord',
                    providerId: profile.id
                })
                const saveUser = await newUser.save()
                return done(null, saveUser)
            }
            return done(null, findUser)
        } catch(err) {
            return done(err, null)
        }
    })
)