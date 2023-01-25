import classes from "./RegisterPage.module.css";
import Input from "../components/Input";
import Button from "../components/Button";
import SocialMedia from "../components/SocialMedia";
import AnimatedPage from "../components/AnimatedPage";
import { toast } from "react-toastify";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { forgotPassword, registerUser } from "../services/authService";

const URL = process.env.REACT_APP_URL

const ForgotPage = () => {
    const [email, setEmail] = useState("")
    const history = useHistory()

    const submitData = async (event) => {
        event.preventDefault()
        console.log("Submit");

        const userData = {
            email,
        }

        console.log(URL)

        try {
            const data = await forgotPassword(userData)
            // const data = await axios.post(`${URL}/api/users/register`, userData, {withCredentials: true})
            toast.info("A link to reset your password was sent to your email.");
            history.push("/login")
        } catch (error) {
            console.log("Error")
            toast.error(error.message)
        }
    };

    const getEmail = (event) => {
        const {value} = event.target
        setEmail(value)
    }


    return (
        <AnimatedPage>
            <form onSubmit={submitData}>
            <div className={classes.registerComponents}>
                <p className={classes.registerTitle}>Remember password</p>
                <p className={classes.registerSubtitle}>
                    We will send an email to reset your password.
                </p>
                    <Input type="text" placeholder="email" getData={getEmail}/>
                    {/* <Input type="password" placeholder="confirm password" /> */}

                    <Button type="submit" btnText="Send"></Button>
                    <SocialMedia />
            </div>
            </form>
        </AnimatedPage>
    );
};

export default ForgotPage;
