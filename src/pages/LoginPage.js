import classes from "./LoginPage.module.css";
import Input from "../components/Input";
import Button from "../components/Button";
import SocialMedia from "../components/SocialMedia";
import AnimatedPage from "../components/AnimatedPage";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { loginUser, testRoute } from "../services/authService";
import { useDispatch } from "react-redux"
import { SET_LOGIN, SET_NAME, SET_USER } from "../redux/features/authSlice";


const LoginForm = () => {
    const dispatch = useDispatch()
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const history = useHistory();

    const submitData = async (event) => {
        event.preventDefault()


        const userData = {
            username: user,
            password: pass
        }

        try {
            const data = await loginUser(userData)
            await dispatch(SET_LOGIN(true))
            await dispatch(SET_NAME(data.username))
            await dispatch(SET_USER({username: data.username, id: data._id, image: data.image}))
            localStorage.setItem("username", data.username); 
            localStorage.setItem("id", data._id); 
            history.push("/")
            console.log(`>> [LoginPage.js] Logged in as ${data.username} (${data._id})`)
        } catch (error) {
            console.log(">> [LoginPage.js] Login error.")
        }
        
    };

    const getUser = (event) => {
        const {value} = event.target
        setUser(value)
    }

    const getPass = (event) => {
        const {value} = event.target
        setPass(value)
    }

    return (
        <AnimatedPage>
            <form onSubmit={submitData}>
                <div className={classes.loginComponents}>
                    <p className={classes.loginTitle}>Welcome!</p>
                    <p className={classes.loginSubtitle}>
                        Login and enjoy the classics.
                    </p>

                    <Input type="text" placeholder="username" getData={getUser} />
                    <Input type="password" placeholder="password" getData={getPass} />
                    <div className={classes.flexBox}>
                        <div className={classes.rememberPass}>
                            <div className={classes.rememberCheckbox}>
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className={classes.checkbox}
                                />
                                <label
                                    htmlFor="remember"
                                    className={classes.loginOptions}
                                >
                                    Remember password
                                </label>
                            </div>

                            <p className={classes.loginOptions} onClick={() => history.push('/forgot')}>
                                Forgot your password?
                            </p>
                        </div>
                    </div>
                    <Button type="submit" btnText="Login"></Button>

                    <SocialMedia />
                </div>
            </form>
        </AnimatedPage>
    );
};

export default LoginForm;
