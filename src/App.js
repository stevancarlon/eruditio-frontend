import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import RenderHomepage from "./RenderHomepage";
import RenderLoginRegister from "./RenderLoginRegister";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

    return (
        <BrowserRouter>
            <ToastContainer/>
            <Route path="/" exact>
                <RenderHomepage />
            </Route>
            <Route path="/home" exact>
                <RenderHomepage />
            </Route>
            <Route path="/favorites" exact>
                <RenderHomepage />
            </Route>
            <Route path="/genres" exact>
                <RenderHomepage />
            </Route>
            <Route path="/search">
                <RenderHomepage/>
            </Route>
            <Route path="/add_book">
                <RenderHomepage/>
            </Route>
            <Route path="/profile/:username">
                <RenderHomepage/>
            </Route>
            <Route path="/book/:bookId">
                <RenderHomepage/>
            </Route>
            <Route path="/settings">
                <RenderHomepage/>
            </Route>
            <Route path="/about">
                <RenderHomepage/>
            </Route>
            <Route path="/logout">
                <RenderHomepage/>
            </Route>
            <Route path="/login">
                <RenderLoginRegister />
            </Route>
            <Route path="/register">
                <RenderLoginRegister />
            </Route>
            <Route path="/forgot">
                <RenderLoginRegister />
            </Route>
            <Route path="/resetpassword/:token">
                <RenderLoginRegister />
            </Route>
        </BrowserRouter>
    );
}

export default App;
