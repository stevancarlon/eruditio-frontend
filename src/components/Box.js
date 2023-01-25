import classes from "./Box.module.css";

const Box = (props) => {

    return (
        <main className={classes.main}>
                <div className={classes.box}>
                    {props.children}
                </div>
        </main>
    );
};

export default Box;
