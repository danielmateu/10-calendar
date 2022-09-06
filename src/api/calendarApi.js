import axios from 'axios';
import { getEnvVariables } from '../helpers';

const {VITE_API_URL} = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL
})

//Todo: Configurar interceptores

calendarApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers, //Esparcimos todos los headers que vengan en la configuración
        'x-token':localStorage.getItem('token')
    }

    return config;
})



export default calendarApi;