import React from 'react';
import PropTypes from 'prop-types';
import { months } from '../../utils/dateUtils.js';
import './header.scss';

const dayWeek = 7;
const Header = ({ weekDates, setWeekStartDate, toggleModal }) => {
  const nextWeek = () => {
    setWeekStartDate(date => {
      const result = date.setDate(date.getDate() + dayWeek);
      return new Date(result);
    });
  };
  const prevWeek = () => {
    setWeekStartDate(date => {
      const result = date.setDate(date.getDate() - dayWeek);
      return new Date(result);
    });
  };
  const currentDay = () => {
    setWeekStartDate(new Date());
  };
  const startMonthWeek = weekDates[0].getMonth();
  const endMonthWeek = weekDates[weekDates.length - 1].getMonth();
  const isWithNextMonth = startMonthWeek < endMonthWeek;

  return (
    <header className="header">
      <button className="button create-event-btn" onClick={() => toggleModal(true)}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button" onClick={currentDay}>
          Today
        </button>
        <button className="icon-button navigation__nav-icon" onClick={prevWeek}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="icon-button navigation__nav-icon" onClick={nextWeek}>
          <i className="fas fa-chevron-right"></i>
        </button>

        <span className="navigation__displayed-month">
          {!isWithNextMonth
            ? `${months[startMonthWeek]}`
            : `${months[startMonthWeek]} - ${months[endMonthWeek]}`}
        </span>
      </div>
    </header>
  );
};

export default Header;

Header.propTypes = {
  weekDates: PropTypes.array.isRequired,
  setWeekStartDate: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
