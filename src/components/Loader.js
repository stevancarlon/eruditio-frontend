import classes from './Loader.module.css'

const Loader = () => {
    return (
        <div className={classes.loader}>
            <div className={classes['loader-wheel']}></div>
            <div className={classes['loader-text']}></div>
        </div>
    );
};

export default Loader