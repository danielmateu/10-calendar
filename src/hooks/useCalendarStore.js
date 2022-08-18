import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent, onUpdateState, onDeleteEvent } from "../store";



export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const {events,activeEvent} = useSelector(state => state.calendar)

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async(calendarEvent) => {
        //TODO: LLegar al Backend

        //TODO Bien
        if(calendarEvent._id){
            //Actualizando 
            dispatch(onUpdateState({...calendarEvent}))
        }else{
            //Creando
            dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}))
        }
    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent())
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
    }
}