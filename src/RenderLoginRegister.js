import { Route } from "react-router-dom";
import classes from "./App.module.css";
import LoginNavBar from "./components/LoginNavBar";
import LoginPage from "./pages/LoginPage";
import ForgotPage from "./pages/ForgotPage";
import RegisterPage from "./pages/RegisterPage";
import FormCard from "./components/FormCard";
import ChangePassPage from "./pages/ChangePassPage";

function RenderLoginRegister() {
    return (
        
            <FormCard>
                <main>
                    <LoginNavBar />
                    <Route path="/login">
                        <LoginPage />
                    </Route>
                    <Route path="/logout">
                        <LoginPage />
                    </Route>
                    <Route path="/register">
                        <RegisterPage />
                    </Route>
                    <Route path="/forgot">
                        <ForgotPage />
                    </Route>
                    <Route path="/resetpassword/:token">
                        <ChangePassPage />
                    </Route>
                </main>
                <div className={classes.homeBgImg}></div>
            </FormCard>
        
    );
}

export default RenderLoginRegister;
