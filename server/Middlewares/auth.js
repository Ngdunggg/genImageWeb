import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const token = req.cookies?.token

    if (!token) {
        return res.status(401).json({success: false, message: "Not Authorized - No Token"})
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        if (!tokenDecode?.id) {
            return res.status(401).json({success: false, message: "Invalid token payload"})
        }

        req.userId = tokenDecode.id
        next()
    } catch (err) {
        return res.status(401).json({success: false, message: "Token invalid or expired", error: err.message})
    }
}

export default authUser
