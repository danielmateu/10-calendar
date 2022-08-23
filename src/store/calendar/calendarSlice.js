import {createSlice} from '@reduxjs/toolkit';
// import {
//     addHours, set
// } from 'date-fns';

// const tempEvent = {
//     id: new Date().getTime(),
//     title: 'Hacer Caca',
//     notes: 'Comprar Pan',
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: '#fafafa',
//     user: {
//         id: '123',
//         name: 'Dani'
//     }
// }

export const calendarSlice = createSlice({

    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [
            // tempEvent
        ],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state, {payload}) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, {payload}) => {
            state.events.push(payload);
            state.activeEvent = null;

        },
        onUpdateEvent: (state, {payload}) => {
            state.events = state.events.map(event => {

                if(event.id === payload.id) return payload;

                return event;
            })
        },
        onDeleteEvent: (state) => {
            if(state.activeEvent){
                state.events = state.events.filter(event => event.id !== state.activeEvent.id);
                state.activeEvent = null;

            }
        },
        onLoadEvents: (state, {payload=[]}) => {
            state.isLoadingEvents = false;
            // state.events = payload;
            payload.forEach(event => {
                const exists = state.events.some(dbEvent => dbEvent.id === event.id)
                if(!exists){
                    state.events.push( event )
                }
            })

        },
        onLogOutCalendar: (state) => {
            state.isLoadingEvents = true,
            state.events = [],
            state.activeEvent = null
            
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent, 
    onDeleteEvent,
    onLoadEvents,
    onLogOutCalendar,
} = calendarSlice.actions;