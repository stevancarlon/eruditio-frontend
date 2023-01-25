import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getBooks } from "../../services/bookService";

const initialState = {
    books: [],
};

// Get all books
export const getProducts = createAsyncThunk(
    "books/getAll",
    async (_, thunkAPI) => {
        try {
            const response = await getBooks()
            console.log("getProducts result: " + response.data)
            return response.data
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {}
});


export const selectBook = (state) => state.books.books

export default bookSlice.reducer;
