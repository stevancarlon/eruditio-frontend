import { Route } from "react-router-dom";
import HomeNavBar from "./components/HomeNavBar";
import HomePage from "./pages/HomePage";
import FavoritePage from "./pages/FavoritePage";
import GenrePage from "./pages/GenrePage";
import classes from "./RenderHomepage.module.css";
import Footer from "./components/Footer";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/AboutPage";
import BookPage from "./pages/BookPage";
import AddBookPage from "./pages/AddBookPage";
import useRedirectLoggedOutUser from "./customHook/useRedirectLoggedOutUser";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "./redux/features/authSlice";

function RenderHomepage() {
    useRedirectLoggedOutUser("/login");
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser)
    return (
        <>
            {isLoggedIn && (
                <div className={classes.pinkDiv}>
                    <HomeNavBar />
                    <Route path="/" exact>
                        <HomePage />
                    </Route>
                    <Route path="/home">
                        <HomePage />
                    </Route>
                    <Route path="/book/:bookId">
                        <BookPage />
                    </Route>
                    <Route path="/favorites">
                        <FavoritePage />
                    </Route>
                    <Route path="/genres">
                        <GenrePage />
                    </Route>
                    <Route path="/search">
                        <SearchPage />
                    </Route>
                    <Route path="/profile/:username">
                        <ProfilePage />
                    </Route>
                    <Route path="/settings">
                        <SettingsPage />
                    </Route>
                    <Route path="/about">
                        <AboutPage />
                    </Route>
                    <Route path="/add_book">
                        <AddBookPage/>
                    </Route>
                    <Footer />
                </div>
            )}
        </>
    );
}

export default RenderHomepage;
