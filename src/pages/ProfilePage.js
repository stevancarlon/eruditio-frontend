import classes from "./ProfilePage.module.css";
import Box from "../components/Box";
import Button from "../components/Button";
import AnimatedPage from "../components/AnimatedPage";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getFavoriteBooks, getUser } from "../services/bookService";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/authSlice";
import { toast } from "react-toastify";
import { editAboutContent, editProfilePic } from "../services/authService";

const ProfilePage = () => {
    const url = useParams();
    const history = useHistory();
    const username = url.username;
    const [hasImage, userHasImage] = useState(false);
    const [user, setUser] = useState();
    const userData = useSelector(selectUser);
    const [favorites, setFavorites] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const inputFileRef = useRef();
    const textareaRef = useRef(null);

    const [canEdit, setCanEdit] = useState(false);

    const favoriteData = {
        username: username,
    };

    useEffect(() => {
        console.log("[ProfilePage.js] UseEffect...");
        getFavoriteBooks(favoriteData).then((data) =>
            setFavorites(data.data.favoriteBooks)
        );
    }, [username]);

    useEffect(() => {
        console.log("[ProfilePage.js] UseEffect...");
        getUser(username).then((data) => {
            setUser(data.data);
            if (data.data.image) {
                userHasImage(true);
            }
            if (userData.username === username) {
                setCanEdit(true);
            } else {
                setCanEdit(false);
            }
        });
    }, [isEditing, username]);

    const editAbout = () => {
        setIsEditing(!isEditing);
    };

    const openBook = (book_id) => {
        history.push("/book/" + book_id);
    };

    const submitEdit = async (event) => {
        event.preventDefault();
        const formData = {
            username,
            about: textareaRef.current.value,
        };
        try {
            await editAboutContent(formData);
            toast.success("About saved.");
            setIsEditing(false);
            getUser(username).then((data) => {
                setUser(data.data);
            });
        } catch (error) {
            toast.error("Failed to save about.");
        }
    };

    const [enableSaveImage, setEnableSaveImage] = useState(false);
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState();

    const openInputFile = () => {
        inputFileRef.current.click();
    };

    console.log(inputFileRef.current);

    useEffect(() => {
        if (file) {
            console.log(file);
            setImagePreview(URL.createObjectURL(file));
            setEnableSaveImage(true);
        }
    }, [file]);

    const saveImage = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("username", username);
        formData.append("image", file);

        try {
            await editProfilePic(username, formData);
            toast.success("New profile picture saved.");
        } catch (error) {
            toast.error("Error on saving new profile picture.");
        }
        setEnableSaveImage(false);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    console.log(user)

    return (
        <AnimatedPage>
            <div className={classes.userInfo}>
                <form onSubmit={saveImage}>
                    {canEdit && (
                        <input
                            type="file"
                            ref={inputFileRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        ></input>
                    )}
                    {!hasImage && (
                        <div
                            className={classes.profilePic}
                            onClick={openInputFile}
                        >
                            {!file ? (
                                <ion-icon
                                    name="person-circle-outline"
                                    id={classes.userIcon}
                                ></ion-icon>
                            ) : (
                                <img src={imagePreview} />
                            )}
                        </div>
                    )}
                    {hasImage && (
                        <div
                            className={classes.profilePic}
                            onClick={openInputFile}
                        >
                            {!file ? (
                                <img src={user.image} />
                            ) : (
                                <img src={imagePreview} />
                            )}
                        </div>
                    )}
                    {enableSaveImage && (
                        <button type="submit" className={classes.saveImgBtn}>
                            Save image
                        </button>
                    )}
                </form>
                <p className={classes.username}>{username}</p>
            </div>
            <div className={classes.boxContainer}>
                <div>
                    <Box>
                        <div className={classes.aboutInfo}>
                            <div className={classes.flexAboutTitle}>
                                <p className={classes.aboutTitle}>About </p>
                                {canEdit && (
                                    <ion-icon
                                        name="create-outline"
                                        id={classes.editIcon}
                                        onClick={editAbout}
                                    ></ion-icon>
                                )}
                            </div>
                            {!isEditing && user && !user.about && (
                                <p>
                                    {username} didn't write anything about
                                    himself yet.
                                </p>
                            )}
                            {!isEditing && user && user.about && (
                                <p>{user.about}</p>
                            )}
                            {isEditing && (
                                <form
                                    className={classes.flexEditAbout}
                                    onSubmit={submitEdit}
                                >
                                    <textarea
                                        placeholder="Write something about yourself"
                                        ref={textareaRef}
                                    ></textarea>
                                    <div className={classes.flexButton}>
                                        <Button btnText="Save"></Button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </Box>
                </div>
                <div className={classes.flexFavComm}>
                    <Box>
                        <div className={classes.aboutInfo}>
                            <p className={classes.aboutTitle}>Comments</p>
                            <div>
                                {user && user.comments.slice(0,5).map((comment) => (
                                    <div className={classes.eachComment}>
                                    <p>{username} has commented <span onClick={() => openBook(comment.book_id)} className={classes.bookLink}>{comment.book_title}</span>: "<i>{comment.comment}</i>"</p>
                                    </div>
                                ))}
                                {user && !user.comments.length > 0 && <div className={classes.eachComment}><p>This user didn't comment any book yet.</p></div>}
                            </div>
                        </div>
                    </Box>
                    <Box>
                        <div className={classes.aboutInfo}>
                            <p className={classes.aboutTitle}>Favorite books</p>
                            {favorites &&
                                favorites.map((favorite) => (
                                    <div
                                        key={favorite._id}
                                        className={classes.bookTitle}
                                        onClick={() => openBook(favorite._id)}
                                    >
                                        <p>{favorite.title}</p>
                                    </div>
                                ))}
                            {favorites.length === 0 && (
                                <div>
                                    <p>
                                        {username} didn't favorite any book yet.
                                    </p>
                                </div>
                            )}
                        </div>
                    </Box>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default ProfilePage;
