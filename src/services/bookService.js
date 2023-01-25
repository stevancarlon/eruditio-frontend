import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_URL;

// Register user
export const addBook = async (bookData) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/books/add_book`,
            bookData,
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        throw new Error(message);
    }
};

// Add comment
export const addComment = async (commentData) => {
    try {
        console.log(">> [bookService.js] Adding comment...");
        const response = await axios.post(
            `${BACKEND_URL}/api/books/add_comment/${commentData.book_id}`,
            commentData,
            { withCredentials: true }
        );
        toast.success("Comment added.");
        return response;
    } catch (error) {
        console.log(">> [bookService.js] Error.");
    }
};

// Get all comments
export const getComments = async (bookId) => {
    try {
        // console.log(">> [bookService.js] Getting all comments...")
        const response = await axios.get(
            `${BACKEND_URL}/api/books/get_comments/${bookId}`,
            { withCredentials: true }
        );
        // console.log(">> [bookService.js] Returned comments.")
        return response;
    } catch (error) {
        console.log(">> [bookService.js] Error on getting comments.");
    }
};

// Get all books
export const getBooks = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/books/get_books`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        throw new Error(message);
    }
};

export const downloadBook = async (bookId, title) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/books/download_book/${bookId}`, {
          responseType: "blob"
        });
        const blob = new Blob([response.data], { type: 'application/pdf' });
    
        // create a link element and simulate a click on it
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${title}.pdf`;
        return link
    } catch (error) {
        console.log('Error on downloading book.')
    }
}

export const sendFavoriteBook = async (favoriteData) => {
    try {
        console.log("Bookmarking...");
        const response = await axios.put(
            `${BACKEND_URL}/api/books/favorite_book/${favoriteData.book_id}`,
            favoriteData,
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.log("Error on bookmarking.");
    }
};

export const getFavoriteStatus = async (favoriteData) => {
    try {
        // console.log("Getting favorite status");
        const response = await axios.post(
            `${BACKEND_URL}/api/books/favorite_book/${favoriteData.book_id}`,
            favoriteData,
            { withCredentials: true }
        );
        return response;
    } catch (error) {
        console.log(
            "Error on getting favorite status on getFavoriteStatus at bookService.js"
        );
    }
};

export const getFavoriteBooks = async (favoriteData) => {
    try {
        // console.log(`>> [bookService.js] Getting list of favorites (${favoriteData.user_id})`)
        const response = await axios.get(
            `${BACKEND_URL}/api/books/get_favorites/${favoriteData.username}`,
            { withCredentials: true }
        );
        return response;
    } catch (error) {
        console.log(">> [bookService.js] Error on getting list of favorites.");
    }
};

export const getUser = async (username) => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/users/get_user/${username}`,
            { withCredentials: true }
        );
        return response;
    } catch (error) {
        console.log(">> [bookService.js] Error at getUser.");
    }
};

export const currentBook = async (book_id) => {
    try {
        const response = await axios.get(
            `${BACKEND_URL}/api/books/current_book/${book_id}`,
            { withCredentials: true }
        );
        return response;
    } catch (error) {
        console.log(">> [bookService.js] Error at currentBook");
    }
};

export const deleteComment = async (commentData) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/books/delete_comment/${commentData.book_id}`,
            commentData,
            { withCredentials: true }
        );
        // console.log(">> [bookService.js] Comment being deleted.");
        return response;
    } catch (error) {
        console.log(">> [bookService.js] Error at deleteComment");
    }
};

export const editComment = async (commentData) => {
    try {
        const response = await axios.put(
            `${BACKEND_URL}/api/books/edit_comment/${commentData.book_id}`,
            commentData,
            { withCredentials: true }
        );
        return response;
    } catch (error) {
        console.log(">> [bookService.js] Error at editComment");
    }
};