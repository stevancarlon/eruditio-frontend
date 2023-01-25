import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_URL;

// Register user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/users/register`,
            userData,
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

// Login user
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(
            `${BACKEND_URL}/api/users/login`,
            userData,
            { withCredentials: true }
        );
        if (response.statusText === "OK") {
            toast.success("Logged in successfully.");
        }
        return response.data;
    } catch (error) {
        const message =
            (error.message &&
                error.response.data &&
                error.response.data.mesasge) ||
            error.message ||
            error.toString();
        toast.error(message);
        throw new Error("Login error.");
    }
};

//Logout user
export const logoutUser = async () => {
    try {
        await axios.get(`${BACKEND_URL}/api/users/logout`, {
            withCredentials: true,
        });
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};

// Get Login Status
export const getLoginStatus = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`, {
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
        toast.error(message);
    }
};

// // Add profile picture
// export const addProfilePicture = async (username) => {
//     try {
//         const response = await axios.put(`${BACKEND_URL}/api/users/add_image/${username}`)
//         return response.data
//     } catch (error) {
//         console.log('>> [authService.js] Error at addProfilePicture.')
//     }
// }

export const editAboutContent = async (formData) => {
    try {
        const response = await axios.put(`${BACKEND_URL}/api/users/edit_about/${formData.username}`, formData, { withCredentials: true})
        console.log('>> [authService.js] Success at editAbout.')
        return response.data
    } catch (error) {
        console.log('>> [authService.js] Error at editAbout.')
    }
}

export const editProfilePic = async(username, formData) => {
    try{
        const response = await axios.put(`${BACKEND_URL}/api/users/add_image/${username}`, formData, {withCredentials: true})
        return response.data
    } catch (error) {
        console.log('>> [authService.js] Error at editProfile pic.')
    }
}

export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/forgotpassword/`, email)
        return response.data
    } catch (error) {
        console.log('>> [authService.js] Error at forgotPassword.')
    }
}

export const changePassword = async (userData) => {
    try {
        const response = await axios.put(`${BACKEND_URL}/api/users/resetpassword/${userData.token}`, userData)
        return response.data
    } catch (error) {
        console.log('>> [authService.js] Error at changePassword.');
    }
}


export const changeEmail = async (formData) => {
    try {
        const response = await axios.put(`${BACKEND_URL}/api/users/change_email`, formData)
        toast.success("E-mail changed successfully.")
        return response.data
    } catch (error) {
        console.log('>> [authService.js] Error at changeEmail.')
    }
}

export const changeOldPass = async (formData) => {
    try {
        const response = await axios.put(`${BACKEND_URL}/api/users/changepassword`, formData)
        toast.success("Password changed successfully.")
    } catch (error) {
        toast.error("Error on changing password.")
    }
}