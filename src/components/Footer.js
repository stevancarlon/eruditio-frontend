import classes from "./Footer.module.css";

const Footer = () => {
    return (
        <div className={classes.footer}>
            <div className={classes.socialMediaFooter}>
                <a href="https://www.linkedin.com/in/stevancarlon/" target="_blank">
                <ion-icon
                    name="logo-linkedin"
                    id={classes.iconLinkedin}
                ></ion-icon>
                </a>
                <a href="https://github.com/stevancarlon" target="_blank">
                <ion-icon name="logo-github" id={classes.iconGithub}></ion-icon>
                </a>
            </div>
            <div className={classes.footerInfo}>
                <p className={classes.signature}>by Stevan Carlon</p>
            </div>
        </div>
    );
};

export default Footer;
