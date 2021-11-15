import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './event.scss';

const Event = ({ height, marginTop, title, time, deleteEventsHandler, id }) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const [deleteEventWindow, toggleDeleteWindow] = useState(false);

  const showDeleteWindow = event => {
    event.preventDefault();
    toggleDeleteWindow(!deleteEventWindow);
  };

  return (
    <div style={eventStyle} id={id} className="event" onClick={showDeleteWindow}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      {deleteEventWindow && (
        <button className="delete-event-btn" onClick={() => deleteEventsHandler(id)}>
          Delete <i className="far fa-trash-alt"></i>
        </button>
      )}
    </div>
  );
};

export default Event;

Event.propTypes = {
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  deleteEventsHandler: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
