import classes from "./SearchBar.module.css";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import DropBox from "./DropBox";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, SET_LOGIN } from "../redux/features/authSlice";
import { getUser } from "../services/bookService";
import AnimatedMenu from "./AnimatedMenu";
import { logoutUser } from "../services/authService";

const SearchBar = (props) => {
    const searchValue = useRef();
    const searchValue2 = useRef();
    const history = useHistory();
    const userData = useSelector(selectUser);
    const [hasImage, setHasImage] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        getUser(userData.username).then((data) => {
            setUser(data.data);
            if (data.data.image) {
                setHasImage(true);
            }
        });
    }, [hasImage]);

    const searchBooks = (event) => {
        event.preventDefault();
        history.push("/search?q=" + searchValue.current.value);
    };

    const searchBooks2 = (event) => {
        event.preventDefault();
        history.push("/search?q=" + searchValue2.current.value);
    };

    const [open, setOpen] = useState(false);

    const dropBox = () => {
        setOpen(!open);
    };

    const openPage = (event, page) => {
        history.push(`/${page}`);
    };

    const [triggerToggle, setTriggerToggle] = useState(false);
    const dispatch = useDispatch();

    const logout = async () => {
        await logoutUser();
        await dispatch(SET_LOGIN(false));
        history.push("/login");
    };

    return (
        <div>
            <div className={classes.toggleDiv}>
                <ion-icon
                    name="menu-outline"
                    id={classes.toggleIcon}
                    onClick={() => setTriggerToggle(!triggerToggle)}
                ></ion-icon>
                {triggerToggle && (
                    <AnimatedMenu propClass={classes.menuList}>
                        <div className={classes.listFlex}>
                            <div className={classes.closeIcon}>
                                <ion-icon
                                    name="close-circle-outline"
                                    id={classes.closeIconId}
                                    onClick={() =>
                                        setTriggerToggle(!triggerToggle)
                                    }
                                ></ion-icon>
                            </div>

                            

                            <div
                                className={`${classes.menuOption} ${classes.navBarOption}`}
                                onClick={(event) => openPage(event, `home`)}
                            >
                                <div className={classes.marginLeft}>
                                    <ion-icon
                                        name="home-outline"
                                        id={classes.dropBoxIcon}
                                    ></ion-icon>{" "}
                                    Home
                                </div>
                            </div>
                            <div
                                className={`${classes.menuOption} ${classes.navBarOption}`}
                                onClick={(event) =>
                                    openPage(event, `favorites`)
                                }
                            >
                                <div className={classes.marginLeft}>
                                    <ion-icon
                                        name="star-outline"
                                        id={classes.dropBoxIcon}
                                    ></ion-icon>{" "}
                                    Favorites
                                </div>
                            </div>
                            <div
                                className={`${classes.menuOption} ${classes.navBarOption}`}
                                onClick={(event) => openPage(event, `genres`)}
                            >
                                <div className={classes.marginLeft}>
                                    <ion-icon
                                        name="color-filter-outline"
                                        id={classes.dropBoxIcon}
                                    ></ion-icon>{" "}
                                    Genres
                                </div>
                            </div>
                            <div
                                className={classes.menuOption}
                                onClick={(event) =>
                                    openPage(
                                        event,
                                        `profile/${userData.username}`
                                    )
                                }
                            >
                                <div className={classes.marginLeft}>
                                    <ion-icon
                                        name="happy-outline"
                                        id={classes.dropBoxIcon}
                                    ></ion-icon>{" "}
                                    Profile
                                </div>
                            </div>
                            <div
                                className={classes.menuOption}
                                onClick={(event) => openPage(event, `add_book`)}
                            >
                                <div className={classes.marginLeft}>
                                    <ion-icon
                                        name="add-circle-outline"
                                        id={classes.dropBoxIcon}
                                    ></ion-icon>{" "}
                                    Add book
                                </div>
                            </div>
                            <div
                                className={classes.menuOption}
                                onClick={(event) => openPage(event, `settings`)}
                            >
                                <div className={classes.marginLeft}>
                                    <ion-icon
                                        name="settings-outline"
                                        id={classes.dropBoxIcon}
                                    ></ion-icon>{" "}
                                    Settings
                                </div>
                            </div>
                            <div
                                className={classes.menuOption}
                                onClick={(event) => openPage(event, `about`)}
                            >
                                <div className={classes.marginLeft}>
                                    <ion-icon
                                        name="alert-circle-outline"
                                        id={classes.dropBoxIcon}
                                    ></ion-icon>{" "}
                                    About
                                </div>
                            </div>
                            <div
                                className={classes.menuOption}
                                onClick={logout}
                            >
                                <div className={classes.marginLeft}>
                                    <ion-icon
                                        name="log-out-outline"
                                        id={classes.dropBoxIcon}
                                    ></ion-icon>{" "}
                                    Logout
                                </div>
                            </div>
                            <div className={classes.searchForm2}>
                                <ion-icon
                                    name="search-outline"
                                    id={classes.searchIcon}
                                ></ion-icon>
                                <form onSubmit={searchBooks2}>
                                <input
                                    type={props.type}
                                    className={classes.input}
                                    placeholder={props.placeholder}
                                    ref={searchValue2}
                                />
                                </form>
                            </div>
                        </div>
                    </AnimatedMenu>
                )}
            </div>
            <div className={classes.searchForm}>
                <ion-icon
                    name="search-outline"
                    id={classes.searchIcon}
                ></ion-icon>
                <form onSubmit={searchBooks}>
                <input
                    type={props.type}
                    className={classes.input}
                    placeholder={props.placeholder}
                    ref={searchValue}
                />
                </form>
                {!hasImage && (
                    <ion-icon
                        onClick={dropBox}
                        name="person-circle-outline"
                        id={classes.userIcon}
                    ></ion-icon>
                )}
                {hasImage && (
                    <div className={classes.profilePic} onClick={dropBox}>
                        <img src={user.image} />
                    </div>
                )}

                <DropBox open={open} />
            </div>
        </div>
    );
};

export default SearchBar;
