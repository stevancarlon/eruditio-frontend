import classes from "./Library.module.css";
import Box from "./Box";
import { useContext, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { getBooks } from "../services/bookService";

const Library = () => {
    let booksList = [];
    const history = useHistory()
    const [books, setBooks] = useState([]);


    useEffect(() => {
        // console.log('[Library.js] UseEffect...')
        getBooks().then((data) =>
            setBooks(data)
        );
    }, []);

    if (books) {
        booksList = books.map((book) => (
            <div
                key={book._id}
                className={classes.book}
                onClick={() => history.push("/book/" + book._id)}
            >
                <img
                    className={classes.bookCover}
                    src={book.image.filePath}
                    alt="cover"
                />
                <div className={classes.bookInfo}>
                    <p className={classes.bookTitle}>{book.title}</p>
                    <p className={classes.bookAuthor}>{book.author}</p>
                </div>
            </div>
        ));
    }

    return (
        <div className={classes.library} id="library">
            <h1 className={classes.recent}>Recent uploads</h1>
            <Box>
                <div className={classes.booksGrid}>{booksList}</div>
            </Box>
        </div>
    );
};

export default Library;
