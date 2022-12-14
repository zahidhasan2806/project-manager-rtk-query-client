import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

export default function useAuthCheck() {
    const [authChecked, setAuthChecked] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        let auth = JSON.parse(localStorage.getItem('auth'));
        if (auth && auth.user && auth.accessToken) {
            dispatch(userLoggedIn({ user: auth.user, accessToken: auth.accessToken }));
        }
        setAuthChecked(true);
    }, [dispatch]);

    return authChecked;
}