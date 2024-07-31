import React, { useEffect, useState } from 'react';
import Calendar from '@fullcalendar/react';
import multiMonthPlugin from '@fullcalendar/multimonth';
import dayGridPlugin from '@fullcalendar/daygrid'
import axios from 'axios';
import '../dist/CalendarModule.css';

const CalendarComp = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:2020/locationvoiture/v1/reservation');
        const reservations = response.data;

        // Filter and format reservations
        const filteredReservations = reservations
          .filter(reservation => reservation.reservationStatus === 'EN_COUR' || reservation.reservationStatus === 'ACCEPTEE')
          .map(reservation => ({
            id: reservation.id,
            title: `Reservation: ID:${reservation.id}`,
            start: reservation.startDate,
            end: reservation.endDate,
            color: reservation.reservationStatus === 'EN_COUR' ? `#5DA${reservation.id}` : `#6${reservation.id}`, // Assign different colors
            extendedProps: {
              status: reservation.reservationStatus,
              fin:reservation.endDate,
              client:`${reservation.client.nom}  ${reservation.client.prenom}`
            }
          }));

        setEvents(filteredReservations);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  console.log(events)
  const formatDate = (date) => date.toISOString().split('T')[0];

  const handleEventClick = (info) => {
    alert(`Reservation ID:  ${info.event.id} \n Status:  ${info.event.extendedProps.status} \n Date Fin:  ${formatDate(new Date(info.event.extendedProps.fin))} \n Client:  ${info.event.extendedProps.client}`);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div style={{border:'1px solid black',color:'black'}}>
          Reservation<br/>
          ID: {eventInfo.event.id}<br/>
      </div>
    );
  };

  return (
    <div className='calendar-container'>
      <h3 className='calendar-title'>Calendrier des Reservation</h3>
      <hr noshade />
      <div className='calendar'>
        <Calendar
          plugins={[multiMonthPlugin,dayGridPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'multiMonthYear,dayGridMonth',
          }}
          initialView="multiMonthYear"
          themeSystem='united'
          events={events}
          eventClick={handleEventClick}
          eventContent={renderEventContent} // Custom event rendering
        />
      </div>
    </div>
  );
};

export default CalendarComp;
