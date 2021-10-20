import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../navigation/Navigation.jsx';
import Sidebar from '../sidebar/Sidebar.jsx';
import './calendar.scss';
import Modal from '../modal/Modal.jsx';
import Week from '../week/Week.jsx';
import {
  fetchEvents,
  fetchNewEvent,
  deleteEvents,
  createObjectForm,
} from '../../gateway/gateWayEvents.js';

const Calendar = ({ weekDates, isOpenModal, toggleModal }) => {
  const [eventList, setEvents] = useState([]);

  const fetchEventsHandler = () => {
    fetchEvents().then(data => setEvents(data));
  };

  useEffect(() => {
    fetchEventsHandler();
  }, []);

  const handleFormData = event => {
    event.preventDefault();
    fetchNewEvent(createObjectForm()).then(() => fetchEventsHandler());
    toggleModal(false);
  };

  const deleteEventsHandler = eventId => {
    deleteEvents(eventId).then(() => fetchEventsHandler());
  };

  const handleToggle = () => {
    toggleModal(false);
  };

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            deleteEventsHandler={deleteEventsHandler}
            weekDates={weekDates}
            eventList={eventList}
          />
          {isOpenModal ? (
            <Modal handleFormData={handleFormData} handleToggle={handleToggle} />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Calendar;

Calendar.propTypes = {
  weekDates: PropTypes.array.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
