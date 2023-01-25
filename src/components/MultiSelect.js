import Select from "react-select";

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

const MultiSelect = (props) => {

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
        props.onSelect(genres)
        props.onChange(event)
    }
    
    return (
        <Select isMulti placeholder="Select genres" name={props.name} styles={customStyles} options={options}  onChange={selectHandler}/>
    );
};

export default MultiSelect;
