import React from 'react'

export const CalendarEvent = ({ event }) => {
    // console.log(props)
    const { title, user,notes } = event;
    return (
        <>
            <strong>{title}</strong>
            <span> - {user.name}</span>
            

        </>
    )
}
