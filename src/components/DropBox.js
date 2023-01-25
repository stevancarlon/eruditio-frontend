import classes from './DropBox.module.css'
import { Fragment } from 'react'
import { useHistory } from "react-router-dom";
import { selectUser, SET_LOGIN } from '../redux/features/authSlice';
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from '../services/authService';

const DropBox = (props) => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser);
    
    const toggle = props.open
    let classHandler;

    if (toggle) {
        classHandler = 'open'
    } else {
        classHandler = 'close'
    }

    const history= useHistory()

    const openProfile = () => {
        history.push(`/profile/${user.username}`)
    }

    const openAddBook = () => {
        history.push('/add_book')
    }

    const openSettings = () => {
        history.push('/settings')
    }
    const openAbout = () => {
        history.push('/about')
    }

    const logout = async () => {
        await logoutUser();
        await dispatch(SET_LOGIN(false));
        history.push("/login");
      };

    return (
        <Fragment>
            <div className={`${classes.dropBox} ${classes['menu--' + classHandler]}`}>
                <p className={classes.itemFlex} onClick={openProfile}><ion-icon name="happy-outline" id={classes.dropBoxIcon}></ion-icon> Profile</p>
                <p className={classes.itemFlex} onClick={openAddBook}><ion-icon name="add-circle-outline"id={classes.dropBoxIcon}></ion-icon> Add book</p>
                <p className={classes.itemFlex} onClick={openSettings}><ion-icon name="settings-outline" id={classes.dropBoxIcon}></ion-icon> Settings</p>
                <p className={classes.itemFlex} onClick={openAbout}><ion-icon name="alert-circle-outline" id={classes.dropBoxIcon}></ion-icon> About</p>
                <p className={classes.itemFlex} onClick={logout}><ion-icon name="log-out-outline" id={classes.dropBoxIcon}></ion-icon> Logout</p>
            </div>
        </Fragment>
    )
}

export default DropBox