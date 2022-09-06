import calendarApi from "../../../src/api/calendarApi"

describe('Pruebas sobre calendarApi', () => { 
    test('Debe de tener la configuración por defecto', () => {  
        // console.log(calendarApi);
        console.log(process.env);
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
    })
})