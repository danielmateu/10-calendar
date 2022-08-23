import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect, useState } from 'react';

import { Navbar, CalendarEvent,CalendarModal,FabAddNew, FabDelete } from "../"

import { getMessagesEs, localizer } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';



export const CalendarPage = () => {


  const {openDateModal} = useUiStore()
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore()
  const [lastView, setlastView] = useState(localStorage.getItem('lastView')|| 'week')

  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log({ event, start, end, isSelected })

    const style = {
      backgroundColor: '#34cf7',
      borderRadius: 0,
      opacity: .8,
      color: 'white'

    }

    return {
      style
    }

  }

  const onDoubleClick = (event) => {
    // console.log({onDoubleClick: event})
    openDateModal(event);
  }
  
  const onSelect = (event) => {
    // console.log({click: event})
    
    // openDateModal();
    // openDateModal(event);

    setActiveEvent(event)
  }

  const onViewChanged = (event) => {
    // console.log({onViewChanged:event})
    localStorage.setItem('lastView', event);
    setlastView(event)

  }

  useEffect(() => {
    startLoadingEvents()
  }, [])
  
  return (
    <>
      <Navbar />

      <CalendarModal/>


      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '90vh' }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components = {
          {
            event: CalendarEvent
          } 
        }
        onDoubleClickEvent = {onDoubleClick}
        onSelectEvent = {onSelect}
        onView = {onViewChanged}
        />

        <FabAddNew/>
        <FabDelete/>


    </>
  )
}
