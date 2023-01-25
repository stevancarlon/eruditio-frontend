import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { selectUser } from "../redux/features/authSlice";
import {
    addComment,
    getComments,
    getUser,
    deleteComment,
    editComment,
} from "../services/bookService";
import Box from "./Box";
import classes from "./CommentForm.module.css";
import AnimatedPage from "./AnimatedPage";
import { toast } from "react-toastify";

let commentsList = [];

const CommentForm = (props) => {
    const commentRef = useRef();
    const user = useSelector(selectUser);
    const user_id = user.id;
    const username = user.username;
    const { bookId } = useParams();
    const [comments, setComments] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [image, setImage] = useState();
    const history = useHistory();
    const [triggerEffect, setTriggerEffect] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        console.log("[CommentForm.js] UseEffect...");
        getComments(bookId).then((data) => {
            setComments(data.data);
        });
    }, [props.changeState, triggerEffect]);

    const triggerDeleteComment = async (id) => {
        const deleteData = {
            username,
            book_id: bookId,
            comment_id: id,
        };

        try {
            await deleteComment(deleteData);
            // toast.success('Comment ')
            // console.log("Comment deleted.")
            setTriggerEffect(!triggerEffect);
        } catch (error) {
            console.log("Error at deleting comment.");
        }
    };

    const submitComment = async (event) => {
        event.preventDefault();

        const comment = commentRef.current.value;

        let commentData = {};

        try {
            await getUser(username).then(
                (result) =>
                    (commentData = {
                        book_id: bookId,
                        user_id,
                        username,
                        comment,
                        image: result.data.image,
                    })
            );
            console.log("will this debug work?");
        } catch (error) {
            console.log("error on getting image");
        }

        await addComment(commentData);
        getComments(bookId).then((result) => setComments(result.data));
    };

    const triggerEditComment = () => {
        console.log("trigger edit comment");
        setIsEditing(!isEditing);
    };

    const textareaRef = useRef(null)

    const saveCommentEdit = async (event, comment_id) => {
        event.preventDefault()
        console.log(event)
        setIsEditing(false)

        const editCommentData = {
            comment_id,
            new_comment: textareaRef.current.value,
            book_id: bookId,
            username,
        }
        
        try {
            await editComment(editCommentData)
            setTriggerEffect(!triggerEffect)
        } catch (error) {
            console.log('Error on editing comment.')
        }
    }

    if (comments.length > 0) {
        commentsList = (
            <div>
                <p>{comments[0].comment}</p>
            </div>
        );

        let counter = 0;

        commentsList = comments.map((comment) => (
            <AnimatedPage propClass={classes.commentContainer} key={counter++}>
                <div className={classes.commentContainer}>
                    <div className={classes.imageNickContainer}>
                        <div className={classes.nickCommentContainer}>
                            <div className={classes.commentHeader}>
                                <div className={classes.lastFlex}>
                                    <div className={classes.picInComments}>
                                        {comment.image ? (
                                            <img src={comment.image} />
                                        ) : (
                                            <ion-icon
                                                name="person-circle-outline"
                                                id={classes.userIcon}
                                            ></ion-icon>
                                        )}
                                    </div>
                                    <p
                                        className={classes.username}
                                        onClick={() =>
                                            history.push(
                                                "/profile/" + comment.username
                                            )
                                        }
                                    >
                                        {comment.username}
                                    </p>
                                    <span className={classes.commentDate}>
                                        • {comment.date} {comment.is_edited && <span>• (edited)</span>}
                                    </span>
                                </div>
                                {comment.username === username && (
                                    <div className={classes.commentIcons}>
                                        <ion-icon
                                            name="create-outline"
                                            id={classes.editCommIcon}
                                            onClick={() => triggerEditComment()}
                                        ></ion-icon>
                                        <ion-icon
                                            name="trash-outline"
                                            id={classes.deleteCommIcon}
                                            onClick={() =>
                                                triggerDeleteComment(
                                                    comment.comment_id
                                                )
                                            }
                                        ></ion-icon>
                                    </div>
                                )}
                            </div>
                            {!isEditing && (
                                <p className={classes.comment}>
                                    {comment.comment}
                                </p>
                            )}
                            {isEditing && (
                                    <form className={classes.editComment} onSubmit={(event) => saveCommentEdit(event, comment.comment_id)}>
                                        <textarea placeholder="write your comment here" ref={textareaRef}></textarea>
                                        <button type="submit">Save</button>
                                    </form>

                            )}
                        </div>
                    </div>
                </div>
            </AnimatedPage>
        ));
    } else {
        commentsList = (
            <div>
                <p>Be the first to comment.</p>
            </div>
        );
    }

    return (
        <Box>
            <form className={classes.commentForm} onSubmit={submitComment}>
                <input
                    type="text"
                    placeholder="Leave your comment..."
                    ref={commentRef}
                ></input>
                <button>Comment</button>
            </form>
            {commentsList}
        </Box>
    );
};

export default CommentForm;
