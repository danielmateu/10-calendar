import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { onChecking } from "../store";


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
            localStorage.setItem('token-init-date', new Date().get);
            
        } catch (error) {
            console.log(error);
        }
    }


    return {
    //Propiedades
    status, 
    user, 
    errorMessage,
    
    //Métodos
    startLogin,

    }

}