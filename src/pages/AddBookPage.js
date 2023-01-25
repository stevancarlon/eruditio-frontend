import classes from "./AddBookPage.module.css";
import Box from "../components/Box";
import Input from "../components/Input";
import Button from "../components/Button";
import { addBook } from "../services/bookService";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import MultiSelectAdd from "../components/MultiSelectAdd";
import AnimatedPage from "../components/AnimatedPage";
import Loader from "../components/Loader";
import InputBookPage from "../components/InputBookPage";
import InputTextArea from "../components/InputTextArea";

const initialState = {
    title: "",
    author: "",
    genre: "",
    synopsis: "",
};

let genre = [];

const AddBookPage = () => {
    const [formData, setformData] = useState(initialState);
    const [bookImage, setBookImage] = useState("");
    const [pdfFile, setPdfFile] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const { title, author, synopsis } = formData;
    const scrollRef = useRef();
    const [isLoading, setIsLoading] = useState(false);

    const titleRef = useRef();
    const authorRef = useRef();
    const synopsisRef = useRef();
    const genreRef = useRef();
    const imageRef = useRef();
    const pdfFileRef = useRef();

    const form = document.getElementById("addBookForm");

    const executeScroll = () => scrollRef.current.scrollIntoView();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setformData({ ...formData, [name]: value });
    };

    const [imageName, setImageName] = useState();

    const handleImageChange = (event) => {
        setImageName("Image uploaded");
        setBookImage(event.target.files[0]);
        setImagePreview(URL.createObjectURL(event.target.files[0]));
    };

    const [bookName, setBookName] = useState();

    const handlePdfFileChange = (event) => {
        setBookName(event.target.files[0].name);
        setPdfFile(event.target.files[0]);
    };

    const MullSelectAddHandler = (genres) => {
        genre = genres;
    };

    const saveBook = async (event) => {
        event.preventDefault();

        const userData = new FormData();
        userData.append("title", title);
        userData.append("author", author);
        userData.append("genre", genre);
        userData.append("synopsis", synopsis);
        userData.append("image", bookImage);
        userData.append("pdf_file", pdfFile);
        // const userData = {
        //     title,
        //     author,
        //     genre,
        //     synopsis,
        //     image: bookImage,
        //     pdf_file: pdfFile
        // }

        try {
            setIsLoading(true);
            await addBook(userData);
            setIsLoading(false);
            toast.success("Book added successfully!");
        } catch (error) {
            setIsLoading(false);
            toast.error("Error.");
        }

        setformData(initialState);
        setImagePreview("");
        genreRef.current.clearValue();
        form.reset();

        executeScroll();
    };

    return (
        <div className={classes.wrapper} id="formNewBook" ref={scrollRef}>
            <AnimatedPage>
                {!isLoading && (
                    <Box>
                        <form
                            className={classes.form}
                            onSubmit={saveBook}
                            id="addBookForm"
                        >
                            <h3>Add a new book</h3>
                            <div className={classes.titleAuthorFlex}>
                                <InputBookPage
                                    name="title"
                                    placeholder="Title"
                                    getData={handleInputChange}
                                    inputRef={titleRef}
                                />
                                <InputBookPage
                                    name="author"
                                    placeholder="Author"
                                    getData={handleInputChange}
                                    inputRef={authorRef}
                                />
                            </div>
                            <div></div>
                            <div className={classes.divTextarea}>
                                <InputTextArea
                                    name="synopsis"
                                    placeholder="Synopsis"
                                    getData={handleInputChange}
                                    inputRef={synopsisRef}
                                />
                            </div>
                            <div className={classes.multiSelectDiv}>
                                {/* <label htmlFor="genre">Choose a genre:</label> */}
                                <MultiSelectAdd
                                    name="genre"
                                    onChange={MullSelectAddHandler}
                                    inputRef={genreRef}
                                />
                            </div>
                            <div className={classes.wrapInputFiles}>
                                <div className={classes.insertImage}>
                                    <label
                                        htmlFor="pdf_file"
                                        className={classes.inputFile}
                                    >
                                        {bookName ? (
                                            <>{bookName}</>
                                        ) : (
                                            <>Add book file</>
                                        )}
                                    </label>
                                    <input
                                        id="pdf_file"
                                        type="file"
                                        name="pdf_file"
                                        placeholder="File"
                                        onChange={handlePdfFileChange}
                                        ref={pdfFileRef}
                                        style={{ display: "none" }}
                                    />
                                </div>
                                <div className={classes.insertImage}>
                                    <label
                                        htmlFor="image"
                                        className={classes.inputFile}
                                    >
                                        {imageName ? (
                                            <>{imageName}</>
                                        ) : (
                                            <>Add book cover</>
                                        )}
                                    </label>
                                    <input
                                        id="image"
                                        type="file"
                                        name="image"
                                        placeholder="Image"
                                        onChange={handleImageChange}
                                        ref={imageRef}
                                        style={{ display: "none" }}
                                    />
                                </div>
                            </div>
                            {imagePreview && (
                                <div className={classes.imagePreview}>
                                    <img src={imagePreview} />
                                </div>
                            )}
                            <div>
                                <Button btnText="Save" type="submit" />
                            </div>
                        </form>
                    </Box>
                )}
                {isLoading && (
                    <Box>
                        <div className={classes.wrapLoader}>
                            <Loader />
                        </div>
                    </Box>
                )}
            </AnimatedPage>
        </div>
    );
};

export default AddBookPage;
