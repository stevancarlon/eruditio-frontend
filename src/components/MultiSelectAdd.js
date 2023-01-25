import Select from "react-select";
import classes from './MultiSelect.module.css'

const customStyles = {
    menu: (provided, state) => ({
        ...provided,
        padding: 10,
        backgroundColor: "#424769",
    }),
    select: (provided, state) => ({
        ...provided,
        backgroundColor: "#424769",
    }),
    option: (provided, state) => ({
        padding: "10px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#2D3250",
        },
    }),
    placeholder: (provided) => ({
        ...provided,
        color: "#6D75A4",
        fontSize: '15px'
    }),
    dropdownIndicator: (base) => ({
        ...base,
        color: "#6D75A4",
    }),
    control: () => ({
        width: "100%",
        backgroundColor: "#424769",
        cursor: "pointer",
        display: "flex",
        textAlign: "left",
        color: "#6D75A4",
        zIndex: 999
    }),

    singleValue: (provided, state) => ({
        ...provided,
        color: "#6D75A4",
        textAlign: "left",
    }),
    indicatorSeparator: () => ({
        display: "none",
    })
};



const options = [
    { label: "Science", value: "science" },
    { label: "Psychology", value: "psychology" },
    { label: "Philosophy", value: "philosophy" },
    { label: "Romance", value: "romance" },
    { label: "Sci-fi", value: "scifi" },
    { label: "Fantasy", value: "fantasy" },
    { label: "Mystery", value: "mystery" },
    { label: "Poetry", value: "poetry" },
    { label: "Action", value: "action" },
    { label: "Novel", value: "novel" },
    { label: "Biography", value: "biography" },
];

const MultiSelectAdd = (props) => {

    let genres = []

    const selectHandler = (event) => {
        if (event.length > 0) {
            genres = event.map((event) => (
                event.value
            ))
        } else {
            genres = []
        }
        
        // console.log(genres)
        // console.log(genres)
        props.onChange(genres)
    }
    
    return (
        <div className={classes.select}>
        <Select isMulti name={props.name} styles={customStyles} options={options}  onChange={selectHandler} ref={props.inputRef} placeholder="Select genres"/>
        </div>
    );
};

export default MultiSelectAdd;
