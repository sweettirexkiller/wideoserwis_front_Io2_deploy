import {useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCurrentToken} from "./authSlice";

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();
    return (
        token ? "You are logged in" : <Navigate to={'/login'} state={{from:location}} replace/>
    );
}

export default RequireAuth;