import classes from './FormCard.module.css'

const FormCard = (props) => {
    return (
        <div className={classes.centerFlex}>
        <div className={`${classes.card} ${classes["grid-box-2col"]}`}>
            {props.children}
        </div>
        </div>
    )
}

export default FormCard