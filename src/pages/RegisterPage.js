import classes from "./RegisterPage.module.css";
import Input from "../components/Input";
import Button from "../components/Button";
import SocialMedia from "../components/SocialMedia";
import AnimatedPage from "../components/AnimatedPage";
import { toast } from "react-toastify";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../services/authService";
import axios from "axios";

const URL = process.env.REACT_APP_URL

const RegisterForm = () => {
    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const [email, setEmail] = useState("")
    const history = useHistory()

    const submitData = async (event) => {
        event.preventDefault()
        console.log("Submit");
        console.log("User: " + user)
        console.log("Pass: " + pass)

        const userData = {
            username: user,
            password: pass,
            email: email
        }

        console.log(URL)

        try {
            const data = await registerUser(userData)
            // const data = await axios.post(`${URL}/api/users/register`, userData, {withCredentials: true})
            toast.success("User registered successfully");
            history.push("/home")
        } catch (error) {
            console.log("Error")
            toast.error(error.message)
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

    const getEmail = (event) => {
        const {value} = event.target
        setEmail(value)
    }

    return (
        <AnimatedPage>
            <form onSubmit={submitData}>
            <div className={classes.registerComponents}>
                <p className={classes.registerTitle}>Sign up</p>
                <p className={classes.registerSubtitle}>
                    Access +10,000 books.
                </p>
                    <Input type="text" placeholder="username" getData={getUser}/>
                    <Input type="email" placeholder="email" getData={getEmail}/>
                    <Input type="password" placeholder="password" getData={getPass}/>
                    {/* <Input type="password" placeholder="confirm password" /> */}

                    <Button type="submit" btnText="Create account"></Button>
                    <SocialMedia />
            </div>
            </form>
        </AnimatedPage>
    );
};

export default RegisterForm;
