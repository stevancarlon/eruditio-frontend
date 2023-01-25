import classes from "./SocialMedia.module.css";

const SocialMedia = () => {
    return (
        <div className={classes.socialMedia}>
            <p>Find me on</p>
            <ion-icon name="logo-linkedin" id={classes.iconLinkedin}></ion-icon>
            <ion-icon name="logo-github" id={classes.iconGithub}></ion-icon>
        </div>
    );
};

export default SocialMedia;
