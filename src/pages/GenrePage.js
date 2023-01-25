import AnimatedPage from "../components/AnimatedPage";
import classes from "./GenrePage.module.css";
import Box from "../components/Box";
import MultiSelect from "../components/MultiSelect";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getBooks } from "../services/bookService";

const GenrePage = () => {
    const [books, setBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState(books);
    const history = useHistory();

    let filteredByGenre = [];

    useEffect(() => {
        console.log('>> [GenrePage.js] Use effect')
        getBooks().then((data) => {
            console.log(data)
            setBooks(data)
            setFilteredBooks(data)
        })
    }, [])

    const getGenres = (genre) => {
        filteredByGenre = books.filter((book) => {
            return genre.every((g) => book.genre.includes(g));
        });
        console.log('getGenres')
    };

    const updateFilteredBooks = () => {
        setFilteredBooks(null);

        setTimeout(() => setFilteredBooks(filteredByGenre), 1);
        console.log('updateFilteredBooks')
    };

    let counter = 0;

    return (
        <AnimatedPage>
            <main>
                <div className={classes.main}>
                    <Box>
                        <div className={classes.chooseGenre}>
                            
                            <MultiSelect
                                onSelect={getGenres}
                                onChange={updateFilteredBooks}
                                
                            />
                        </div>
                        <div
                            className={`${classes.booksGrid} ${classes.smallMargin}`}
                        >
                            {filteredBooks ? (
                                filteredBooks.map((book) => (
                                    <AnimatedPage propClass={classes.animated}>
                                        <div
                                            key={counter++}
                                            className={classes.book}
                                            onClick={() =>
                                                history.push("book/" + book._id)
                                            }
                                        >
                                            <img
                                                src={book.image.filePath}
                                                className={classes.bookCover}
                                                alt="cover"
                                            />
                                            <div className={classes.bookInfo}>
                                                <p>{book.title}</p>
                                                <p
                                                    className={
                                                        classes.bookAuthor
                                                    }
                                                >
                                                    {book.author}
                                                </p>
                                            </div>
                                        </div>
                                    </AnimatedPage>
                                ))
                            ) : (
                                <p>Nothing here.</p>
                            )}
                        </div>
                    </Box>
                </div>
            </main>
        </AnimatedPage>
    );
};

export default GenrePage;
