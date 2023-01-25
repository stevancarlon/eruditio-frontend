import classes from "./SettingsPage.module.css";
import Box from "../components/Box";
import AnimatedPage from "../components/AnimatedPage";
import { useRef, useState } from "react";
import Input from "../components/Input";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/authSlice";
import { changeEmail, changeOldPass } from "../services/authService";
import { toast } from "react-toastify";

const SettingsPage = () => {
    const userData = useSelector(selectUser);

    const [emailBox, setEmailBox] = useState(false);
    const [passBox, setPassBox] = useState(false)
    
    // data for e-mail form submission
    const emailRef = useRef()

    // data for pass form submission
    const oldPassRef = useRef()
    const newPassRef = useRef()
    const confirmNewPassRef = useRef()
    
    
    const submitEmail = async (event) => {
        event.preventDefault()

        const formData = {
            username: userData.username,
            email: emailRef.current.value
        }
        try {
            await changeEmail(formData)
        } catch (error) {
            toast.error('An error occurred.')
        }
    }

    const submitPassword = async (event) => {
        event.preventDefault()
        const formData = {
            username: userData.username,
            oldPass: oldPassRef.current.value,
            newPass: newPassRef.current.value,
            confirmNewPass: confirmNewPassRef.current.value
        }
        try {
            await changeOldPass(formData)
        } catch (error) {
            toast.error("Error on changing password.")
        }
    }


    const toggleChangeEmail = () => {
        setEmailBox(!emailBox);
    };

    const toggleChangePass = () => {
        setPassBox(!passBox);
    };

    return (
        <AnimatedPage>
            <div className={classes.userInfo}>
                <ion-icon
                    name="settings-outline"
                    id={classes.settingsIcon}
                ></ion-icon>
                <p>Settings</p>
            </div>
            <div className={classes.boxContainer}>
                <Box>
                    <div className={classes.aboutInfo}>
                        <p className={classes.aboutTitle}>Account</p>
                        <p
                            className={classes.settingsOption}
                            onClick={toggleChangeEmail}
                        >
                            Change e-email
                        </p>
                        {emailBox && (
                            <AnimatedPage>
                            <form className={classes.emailForm} onSubmit={submitEmail}>
                                <input type="email" placeholder="enter your new email" ref={emailRef}/>
                                <div>
                                    <button type="submit">Change email</button>
                                    <button type="button" onClick={toggleChangeEmail}>Cancel</button>
                                </div>
                            </form>
                            </AnimatedPage>
                        )}
                        <p className={classes.settingsOption} onClick={toggleChangePass}>
                            Change password
                        </p>
                        {passBox && (
                            <AnimatedPage>
                            <form className={classes.emailForm} onSubmit={submitPassword}>
                                <input type="password" placeholder="enter your old password" ref={oldPassRef}/>
                                <input type="password" placeholder="enter your new password" ref={newPassRef}/>
                                <input type="password" placeholder="confirm your new password" ref={confirmNewPassRef}/>
                                <div>
                                    <button type="submit">Change email</button>
                                    <button type="button" onClick={toggleChangePass}>Cancel</button>
                                </div>
                            </form>
                            </AnimatedPage>
                        )}
                    </div>
                </Box>
            </div>
        </AnimatedPage>
    );
};

export default SettingsPage;
