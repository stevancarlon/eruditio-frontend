import { NavLink } from "react-router-dom";
import classes from "./HomeNavBar.module.css";
import logo from '../assets/logo.png'
import SearchBar from '../components/SearchBar'
import { useHistory } from "react-router-dom";

const HomeNavBar = () => {
    const history = useHistory()

    const openHome = () => {
        history.push('/home')
    }

    return (
        // <AnimatedPage>
            <header className={classes.header}>
                <nav>
                    <img src={logo} className={classes.logo} alt="logo" onClick={openHome}></img>
                    <ul>
                        <li>
                            <NavLink
                                to="/home"
                                activeClassName={classes.active}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/favorites"
                                activeClassName={classes.active}
                            >
                                Favorites
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/genres"
                                activeClassName={classes.active}
                            >
                                Genres
                            </NavLink>
                        </li>
                    </ul>
                    
                    <SearchBar placeholder="Search..." />
                </nav>
                
            </header>
        // </AnimatedPage>
    );
};

export default HomeNavBar;
