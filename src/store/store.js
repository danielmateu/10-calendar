import {configureStore} from '@reduxjs/toolkit';
// import {calendarSlice} from './calendar';
// import {uiSlice} from './ui';
// import {authSlice} from './auth/authSlice'
import {calendarSlice,uiSlice,authSlice} from './';



export const store = configureStore({

    reducer: {
        auth:     authSlice.reducer,
        calendar: calendarSlice.reducer,
        ui:       uiSlice.reducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})