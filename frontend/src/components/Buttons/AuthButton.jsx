import { Link } from "react-router-dom"
import Logout from "./Logout.jsx"
import useWindowWidth from "@/hooks/useWindowWidth.js"
import loginIcon from "@/assets/login.svg"


export default function AuthButton({ auth }) {
    const width = useWindowWidth()
    return (
        <div className="Login">
            {auth ? (
                <Logout />
            ) : (
                <Link to="/login" aria-label="Log in">
                    {width < 800 ? (
                        <img
                            src={loginIcon}
                            alt=""
                            width={24}
                            height={24}
                            style={{ transform: "rotate(180deg)" }}
                        />
                    ) : (
                        "Login"
                    )}
                </Link>
            )}
        </div>
    )
}