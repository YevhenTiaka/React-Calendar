import React from 'react';
import PropTypes from 'prop-types';
import Hour from '../hour/Hour.jsx';
import './day.scss';

const Day = ({ dataDay, dayEvents, deleteEventsHandler }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return hours.map(hour => {
    const hourEvents = dayEvents.filter(event => new Date(event.dateFrom).getHours() === hour);

    return (
      <Hour
        deleteEventsHandler={deleteEventsHandler}
        key={dataDay + hour}
        dataHour={hour}
        hourEvents={hourEvents}
      />
    );
  });
};

export default Day;

Day.propTypes = {
  dataDay: PropTypes.number.isRequired,
  dayEvents: PropTypes.array.isRequired,
  deleteEventsHandler: PropTypes.func.isRequired,
};
