import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_USER } from "../redux/features/authSlice";
import { getLoginStatus } from "../services/authService";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const useRedirectLoggedOutUser = (path) => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const response = await getLoginStatus();
      const isLoggedIn = response.loginStatus
      // console.log(`>> [useRedirectLoggetOutUser.js] ${JSON.stringify(response)}`)
      dispatch(SET_LOGIN(isLoggedIn));
      
      const storageId = localStorage.getItem("id"); 
      const storageUsername = localStorage.getItem('username')
      dispatch(SET_USER({id: storageId, username: storageUsername}))

      if (!isLoggedIn) {
        toast.info("You must login to continue.");
        history.push(path);
        return false
      }

      if (isLoggedIn){
        return true
      }

    };
    redirectLoggedOutUser();
  }, [history, path, dispatch]);
};

export default useRedirectLoggedOutUser;
