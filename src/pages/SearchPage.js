import Box from "../components/Box";
import { useEffect, useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import classes from "./SearchPage.module.css";
import AnimatedPage from "../components/AnimatedPage";
import BooksContext from "../store/auth-context";


const SearchPage = () => {
    const booksCtx = useContext(BooksContext);
    const books = booksCtx.books;
    const history = useHistory()

    const { search } = useLocation();
    const [filteredBooks, setFilteredBooks] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(search);
        const query = params.get("q");

        if (query) {
            const filteredArray = books.filter((book) => {
                return book.title
                    .toLowerCase()
                    .includes(query.toLocaleLowerCase());
            });
            setFilteredBooks(filteredArray);
        }
    }, [search, books]);

    const bookList = filteredBooks.map((book) => (
        <div key={book._id} className={classes.book} onClick={() => history.push('book/' + book._id)}>
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

    console.log(bookList);

    return (
        <Box>
            <AnimatedPage>
                {bookList.length > 0 ? (
                    <div className={classes.booksGrid}>{bookList}</div>
                ) : (
                    <p>Results will appear here.</p>
                )}
            </AnimatedPage>
        </Box>
    );
};

export default SearchPage;
