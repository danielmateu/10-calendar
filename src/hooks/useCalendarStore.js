import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onSetActiveEvent, onUpdateState, onDeleteEvent } from "../store";



export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const {events,activeEvent} = useSelector(state => state.calendar);
    const {user} = useSelector(state => state.auth)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async(calendarEvent) => {
        //TODO: LLegar al Backend

        //TODO: Update event
        if(calendarEvent._id){
            //Actualizando 
            dispatch(onUpdateState({...calendarEvent}))
        }else{
            //Creando

            const {data} = await calendarApi.post('/events', calendarEvent);
            dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user}))
        }
    }

    const startDeletingEvent = () => {
        //Todo: Llegar al Backend

        dispatch(onDeleteEvent())
    };

    const startLoadingEvents = async() => {
        try {
            const {data} = await calendarApi.get('/events');
            // console.log({data});
            const events = convertEventsToDateEvents(data.eventos);
            console.log(events);
        } catch (error) {
            console.log('Error cargando eventos')
            console.log(error)
        }
    }

    return {
        //*Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //*Métodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
}