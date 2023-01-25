import { NavLink } from "react-router-dom";
import classes from './LoginNavBar.module.css'

const NavBar = () => {
    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/login" activeClassName={classes.active}>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" activeClassName={classes.active}>Register</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;
