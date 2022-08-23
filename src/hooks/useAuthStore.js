import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import {
    onChecking,
    onLogin,
    onLogout,
    clearErrorMessage,
    onRegister,
} from "../store";

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        // console.log({ email,password });

        dispatch(onChecking());

        try {
            const { data } = await calendarApi.post("/auth", { email, password });
            // console.log({data});
            localStorage.setItem("token", data.token);
            localStorage.setItem("token-init-date", new Date().getTime()); // creamos el token en la fecha concreta (actual)
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            // console.log(error);
            dispatch(onLogout("Credenciales incorrectas"));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    //startRegister

    const startRegister = async ({ name, email, password, password2 }) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post("/auth/new", {
                name,
                email,
                password,
                password2,
            });
            localStorage.setItem("token", data.token);
            localStorage.setItem("token-init-date", new Date().getTime());
            // console.log({data})
            dispatch(onRegister({ name: data.name, uid: data.uid }));

        } catch (error) {
            // console.log(error);
            dispatch(onLogout(error.response.data?.msg || ''));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    };

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if(!token) return dispatch(onLogout());

        try {
            const {data} = await calendarApi.get('auth/renew');
            localStorage.setItem("token", data.token);
            localStorage.setItem("token-init-date", new Date().getTime());
            // console.log({data})
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    return {
        //Propiedades
        status,
        user,
        errorMessage,

        //Métodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    };
};
