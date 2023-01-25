import AnimatedPage from "../components/AnimatedPage";
import classes from "./FavoritePage.module.css";
import Box from "../components/Box";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFavoriteBooks } from "../services/bookService";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/authSlice";
import Loader from "../components/Loader";


const FavoritePage = () => {
    let favoriteList = [];
    const history = useHistory()
    const [favorites, setFavorites] = useState([]);
    const user = useSelector(selectUser);
    const [isLoading, setIsLoading] = useState(true)

    const favoriteData = {
        username: user.username,
    };

    useEffect(() => {
        console.log('[FavoritePage.js] UseEffect...')
        getFavoriteBooks(favoriteData).then((data) =>
            setFavorites(data.data.favoriteBooks)
        );
        setIsLoading(false)
    }, []);

    favoriteList = favorites.map((favorite) => (
        <div
            key={favorite._id}
            className={classes.bookContainerRound}
            onClick={() => history.push("/book/" + favorite._id)}
        >
            <div className={classes.bookContainer}>
                <div className={classes.book}>
                    <img
                        className={classes.bookCover}
                        src={favorite.image.filePath}
                        alt="cover"
                    />
                </div>
                <div className={classes.bookInfo}>
                    <p className={classes.bookTitle}>{favorite.title}</p>
                    <p className={classes.author}>{favorite.author}</p>
                    <p className={classes.synopsis}>{favorite.synopsis}</p>
                </div>
            </div>
        </div>
    ));

    return (
        <AnimatedPage>
            <main>
                <div className={classes.main}>
                    <Box>
                        <div className={classes.flexBooks}>
                            {favorites.length > 0 && favoriteList}
                            {!favorites.length > 0 && isLoading && <Loader/>}
                            {!favorites.length > 0 && !isLoading && <p>User didn't favorite any book yet.</p>}
                        </div>
                    </Box>
                </div>
            </main>
        </AnimatedPage>
    );
};

export default FavoritePage;
