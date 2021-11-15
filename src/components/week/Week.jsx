import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Day from '../day/Day.jsx';
import Redline from '../Redline/RedLine';
import './week.scss';

const Week = ({ weekDates, eventList, deleteEventsHandler }) => (
  <div className="calendar__week">
    {weekDates.map(dayStart => {
      const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);
      const dayEvents = eventList.filter(
        event => new Date(event.dateFrom) > dayStart && new Date(event.dateTo) < new Date(dayEnd),
      );

      const currentDate = moment(new Date()).format('MMM DD YYY');
      const thisWeek = moment(new Date(dayStart)).format('MMM DD YYY');

      return (
        <div className="calendar__day" data-day={dayStart.getDate()} key={dayStart.getDate()}>
          <Day
            deleteEventsHandler={deleteEventsHandler}
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
          />
          {currentDate === thisWeek && <Redline />}
        </div>
      );
    })}
  </div>
);

export default Week;

Week.propTypes = {
  weekDates: PropTypes.array.isRequired,
  eventList: PropTypes.array.isRequired,
  deleteEventsHandler: PropTypes.func.isRequired,
};
