import React from "react"
import { useAppContext } from "../context/AppContext";
import { loginOrRegister } from "../api";

const Login = () => {
    const { setShowUserLogin, setUser, navigate, fetchUser } = useAppContext()
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmitHandle = async (event) => {
        try {
            event.preventDefault()
            const { data } = await loginOrRegister(state, {name, email, password})
            if( data.success) {
                navigate("/")
                setUser(data.user)
                fetchUser()
                setShowUserLogin(false)
            } else {
                console.log(data.message)    
            }
        } catch(err) {
            console.log(err.message)
        }
    }

    return (
        <div onClick={() => setShowUserLogin(false)} className="fixed top-0 bottom-0 right-0 left-0 z-30 flex items-center text-sm text-gray-600 bg-black/50">
            <form 
                onSubmit={onSubmitHandle}
                onClick={(e) => e.stopPropagation()} 
                className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-2xl shadow-xl border border-bgLight-dark bg-bgLight-dark"
            >
                <p className="text-2xl font-medium m-auto text-white">
                    <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
                </p>
                {state === "register" && (
                    <div className="w-full text-white">
                        <p>Name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} placeholder="Your name" className="bg-bgLight-dark border border-white rounded-3xl w-full p-2 mt-1 outline-primary" type="text" required />
                    </div>
                )}
                <div className="w-full text-white">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Your email" className="bg-bgLight-dark border border-white rounded-3xl w-full p-2 mt-1 outline-primary" type="email" required />
                </div>
                <div className="w-full text-white">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="********" className="bg-bgLight-dark border border-white rounded-3xl w-full p-2 mt-1 outline-primary" type="password" required />
                </div>
                {state === "register" ? (
                    <p>
                        Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
                    </p>
                ) : (
                    <p>
                        Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
                    </p>
                )}
                <button className="bg-primary hover:bg-primary/75 transition-all text-white w-full py-2 rounded-3xl cursor-pointer">
                    {state === "register" ? "Create Account" : "Login"}
                </button>
            </form>        
        </div>
    );
}

export default Login