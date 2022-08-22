import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { onChecking, onLogin, onLogout, clearErrorMessage } from "../store";


export const useAuthStore = () => {

    const { status, user, errorMessage} = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {

        // console.log({ email,password });

        dispatch( onChecking() );

        try {
            const {data} = await calendarApi.post('/auth', { email, password });
            // console.log({data});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime()); // creamos el token en la fecha concreta (actual)
            dispatch( onLogin({ name: data.name, uid:data.uid  }) );
            
        } catch (error) {
            // console.log(error);
            dispatch( onLogout('Credenciales incorrectas') );
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10)
        }
    }

    //startRegister


    return {
    //Propiedades
    status, 
    user, 
    errorMessage,
    
    //Métodos
    startLogin,

    }

}