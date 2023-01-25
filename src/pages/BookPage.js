import classes from "./BookPage.module.css";
import { useParams } from "react-router-dom";
import Box from "../components/Box";
import Button from "../components/Button";
import AnimatedPage from "../components/AnimatedPage";
import { useEffect, useState } from "react";
import CommentForm from "../components/CommentForm";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/authSlice";
import { currentBook, downloadBook, getComments, getFavoriteStatus, sendFavoriteBook } from "../services/bookService";
import Loader from "../components/Loader";

const BookPage = () => {
    let { bookId } = useParams();
    const user = useSelector(selectUser);

    const [openComments, setOpenComments] = useState(false);
    const [book, setBook] = useState()
    const [changeState, setChangeState] = useState(false)
    
    const commentsHandler = () => {
        setChangeState(!changeState)
        setOpenComments(!openComments);
    };

    const [hoveringHeart, setHoveringHeart] = useState(false);
    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        currentBook(bookId).then(data => {
            setBook(data.data)
            // console.log(data.data)
        })
    }, [])
    
    const favoriteData = {
        user_id: user.id,
        username: user.username,
        book_id: bookId,
    };

    useEffect(() => {

        const asyncFunction = async () => {
            try {
                const response = await getFavoriteStatus(favoriteData);
                // console.log(response.data.favoriteStatus);
                if (response.data.favoriteStatus != favorited) {
                    setFavorited(!favorited)
                }
                return response;
            } catch (error) {
                console.log("Error on getting favorite status on BookPage.js");
            }
        };
        asyncFunction()
    }, [favorited]);

    const favoriteBook = async () => {
        setFavorited(!favorited);

        try {
            const response = await sendFavoriteBook(favoriteData);
            console.log(response);
            return response;
        } catch (error) {
            console.log("Error on favoriteBook at BookPage.js");
        }
    };

    const [commentCounter, setCommentCounter] = useState(0)

    const getCommentCount = async () => {
        try {
            const response = await getComments(bookId)
            setCommentCounter(response.data.length)
        } catch (error) {
            console.log('error')
        }
    }

    const [linkGenerated, setLinkGenerated] = useState(null)

    const triggerDownloadBook = async () => {
        try {
            const response = await downloadBook(bookId, book.title)
            console.log(response)
            setLinkGenerated(response)
        } catch (error) {
            console.log('Error on triggering download book.')
        }
    }

    useEffect(() => {
        getCommentCount()
    }, [])

    return (
        <AnimatedPage>
            <div>
                <Box>
                    {book && <div className={classes.bookContent}>
                        <div className={classes.book}>
                            <img
                                className={classes.bookCover}
                                src={book.image.filePath}
                                alt="cover"
                            />
                        </div>
                        <div className={classes.bookInfo}>
                            <div className={classes.titleAndFavorite}>
                                <p className={classes.bookTitle}>
                                    {book.title}
                                </p>
                                {!favorited && (
                                    <ion-icon
                                        onClick={favoriteBook}
                                        onMouseEnter={() =>
                                            setHoveringHeart(true)
                                        }
                                        onMouseLeave={() =>
                                            setHoveringHeart(false)
                                        }
                                        name={
                                            hoveringHeart
                                                ? "heart"
                                                : "heart-outline"
                                        }
                                        id={classes.favoriteIcon}
                                    ></ion-icon>
                                )}
                                {favorited && (
                                    <ion-icon
                                        onClick={favoriteBook}
                                        name="heart"
                                        id={classes.favoritedIcon}
                                    ></ion-icon>
                                )}
                            </div>
                            <p>{book.author}</p>
                            <p>{book.synopsis}</p>
                            <div className={classes.wrapingLink}>
                                <div className={classes.btnAndComments}>
                                <Button
                                    btnText="Download"
                                    onClick={() => triggerDownloadBook(book._id)}
                                ></Button>
                                <p
                                    className={classes.commentsLink}
                                    onClick={commentsHandler}
                                >
                                    Comments ({commentCounter})
                                </p>
                                </div>
                                {linkGenerated && <p><a href={linkGenerated.href} download={linkGenerated.download}>Click here.</a></p>}
                            </div>
                            
                        </div>
                    </div>}
                    {!book && <Loader/>}
                </Box>
                {openComments && (
                    <AnimatedPage>
                        <CommentForm changeState={changeState}/>
                    </AnimatedPage>
                )}
            </div>
        </AnimatedPage>
    );
};

export default BookPage;
