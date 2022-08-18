import axios from 'axios';

const {VITE_API_URL} = getEnvVariables()

const calendarApi = axios.create({
    baseUrl: VITE_API_URL
});

//Todo: Configurar interceptores


export default calendarApi;