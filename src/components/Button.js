import classes from './Button.module.css'

const Button = (props) => {
    const btnHandler = () => {

        if (props.btnText === 'Download') {
            props.onClick()
        }
        
    }

    return (
        <button type={props.type} className={classes.button} onClick={btnHandler}>{props.btnText}</button>
    )
}

export default Button