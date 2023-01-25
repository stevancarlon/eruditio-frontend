import classes from "./AboutPage.module.css";
import Box from "../components/Box";
import AnimatedPage from "../components/AnimatedPage";

const AboutPage = () => {
    return (
        <AnimatedPage>
            <div className={classes.userInfo}>
                <ion-icon
                    name="alert-circle-outline"
                    id={classes.aboutIcon}
                ></ion-icon>
                <p>Website info</p>
            </div>
            <div className={classes.boxContainer}>
                <Box>
                    <div className={classes.aboutInfo}>
                        <p className={classes.aboutTitle}>About</p>
                        <p>
                            This is a small React.js and Express.js project for practice purposes.
                        </p>
                    </div>
                </Box>
            </div>
        </AnimatedPage>
    );
};

export default AboutPage;
