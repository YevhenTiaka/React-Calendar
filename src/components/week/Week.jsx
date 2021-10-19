import React from 'react';
import Day from '../day/Day.jsx';

import './week.scss';

const Week = ({ weekDates, eventList, deleteEvents }) => (
  <div className="calendar__week">
    {weekDates.map(dayStart => {
      const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);

      // getting all events from the day we will render
      const dayEvents = eventList.filter(
        event => new Date(event.dateFrom) > dayStart && new Date(event.dateTo) < new Date(dayEnd),
      );

      return (
        <Day
          deleteEvents={deleteEvents}
          key={dayStart.getDate()}
          dataDay={dayStart.getDate()}
          dayEvents={dayEvents}
        />
      );
    })}
  </div>
);

export default Week;
