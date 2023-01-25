import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { BooksContextProvider } from "./store/auth-context";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <BooksContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </BooksContextProvider>
    </Provider>
);
