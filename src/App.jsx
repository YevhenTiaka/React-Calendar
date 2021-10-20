import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import './common.scss';
import { getWeekStartDate, generateWeekRange } from './utils/dateUtils.js';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));
  const [isOpenModal, toggleModal] = useState(false);

  return (
    <>
      <Header toggleModal={toggleModal} weekDates={weekDates} setWeekStartDate={setWeekStartDate} />
      <Calendar isOpenModal={isOpenModal} toggleModal={toggleModal} weekDates={weekDates} />
    </>
  );
};

export default App;
