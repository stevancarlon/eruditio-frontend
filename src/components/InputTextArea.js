import classes from "./InputBookPage.module.css";

const InputTextArea = (props) => {

    const handleChange = (event) => {
        props.getData(event);
        // console.log(titleRef.current.value)
        // titleRef.current.value = ''
        
    };

    return (
        
            <textarea
                // type={props.type}
                className={classes.input}
                placeholder={props.placeholder}
                onChange={handleChange}
                name={props.name}
                ref={props.inputRef}
                style={{paddingTop: '10px', width: '100%'}}
            />
    );
};

export default InputTextArea;
