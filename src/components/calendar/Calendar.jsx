import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation.jsx';
import Week from '../week/Week.jsx';
import Sidebar from '../sidebar/Sidebar.jsx';
import events from '../../gateway/events';
import './calendar.scss';
import Modal from '../modal/Modal.jsx';

const baseUrl = 'https://6141977c357db50017b3db7a.mockapi.io/api/v1/tasks';

const Calendar = ({ weekDates, isOpenModal, toggleModal }) => {
  const [eventList, setEvents] = useState([]);

  const handleFormData = event => {
    event.preventDefault();
    const form = document.querySelector('.event-form');
    const userData = Object.fromEntries(new FormData(form));
    const { title, description, date, startTime, endTime } = userData;

    const eventObj = {
      title,
      description,
      dateFrom: new Date(`${date} ${startTime}`),
      dateTo: new Date(`${date} ${endTime}`),
    };
    events.push(eventObj);
    setEvents(events);
    toggleModal(false);

    fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventObj),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Internal Server Error. Can't create event");
        }
        return response.json();
      })
      .then(data => console.log(data));
  };

  const fetchEvents = () =>
    fetch(baseUrl).then(response => {
      if (!response.ok) {
        throw new Error("Internal Server Error. Can't display events");
      }
      return response.json().then(data => setEvents(data));
    });
  const deleteEvents = eventId => {
    fetch(`${baseUrl}/${eventId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete task');
        }
      })
      .then(() => {
        fetchEvents();
      });
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleToggle = () => {
    toggleModal(true);
  };

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week deleteEvents={deleteEvents} weekDates={weekDates} eventList={eventList} />
          {isOpenModal ? (
            <Modal handleFormData={handleFormData} handleToggle={handleToggle} />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Calendar;
