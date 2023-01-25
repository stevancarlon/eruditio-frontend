import classes from "./LoginPage.module.css";
import Input from "../components/Input";
import Button from "../components/Button";
import SocialMedia from "../components/SocialMedia";
import AnimatedPage from "../components/AnimatedPage";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import { changePassword, loginUser, testRoute } from "../services/authService";
import { useDispatch } from "react-redux"
import { toast } from "react-toastify";


const ChangePassPage = () => {
    const dispatch = useDispatch()
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const history = useHistory();
    const params = useParams()

    console.log(params.token)

    const submitData = async (event) => {
        event.preventDefault()


        const userData = {
            token: params.token,
            password: pass,
            confirmPassword: confirmPass
        }

        try {
            const data = await changePassword(userData)
            history.push("/login")
            console.log(`>> [ChangePassPage.js] Password changed)`)
            toast.success('Password changed successfully.')
        } catch (error) {
            console.log(">> [ChangePassPage.js] Pass reset error.")
        }
        
    };

    const getPass = (event) => {
        const {value} = event.target
        setPass(value)
    }

    const getPassConfirmation = (event) => {
        const {value} = event.target
        setConfirmPass(value)
    }

    return (
        <AnimatedPage>
            <form onSubmit={submitData}>
                <div className={classes.loginComponents}>
                    <p className={classes.loginTitle}>Welcome!</p>
                    <p className={classes.loginSubtitle}>
                        Enter your new password.
                    </p>

                    <Input type="password" placeholder="password" getData={getPass} />
                    <Input type="password" placeholder="confirm password" getData={getPassConfirmation} />
                    <Button type="submit" btnText="Change"></Button>

                    <SocialMedia />
                </div>
            </form>
        </AnimatedPage>
    );
};

export default ChangePassPage;
