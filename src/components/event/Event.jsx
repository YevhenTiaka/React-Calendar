import React, { useState } from 'react';

import './event.scss';

const Event = ({ height, marginTop, title, time, deleteEvents, id }) => {
  const eventStyle = {
    height,
    marginTop,
  };
  const [deleteEventWindow, toggleDeleteWindow] = useState(false);
  const showDeleteWindow = event => {
    event.preventDefault();
    return deleteEventWindow ? toggleDeleteWindow(false) : toggleDeleteWindow(true);
  };
  return (
    <div style={eventStyle} id={id} className="event" onClick={showDeleteWindow}>
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      {!deleteEventWindow ? null : (
        <button className="delete-event-btn" onClick={() => deleteEvents(id)}>
          Удалить <i className="far fa-trash-alt"></i>
        </button>
      )}
    </div>
  );
};

export default Event;
