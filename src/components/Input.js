import classes from "./Input.module.css";

const Input = (props) => {

    const handleChange = (event) => {
        props.getData(event);
        // console.log(titleRef.current.value)
        // titleRef.current.value = ''
        
    };

    return (
        
            <input
                type={props.type}
                className={classes.input}
                placeholder={props.placeholder}
                onChange={handleChange}
                name={props.name}
                ref={props.inputRef}
            />
    );
};

export default Input;
