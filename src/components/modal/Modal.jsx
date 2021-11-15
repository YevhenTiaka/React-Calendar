import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './modal.scss';
import { fetchNewEvent } from '../../gateway/gateWayEvents';

const Modal = ({ toggleModal, handleToggle, fetchEventsHandler }) => {
  const [inputText, setInputText] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputTimeFrom, setInputTimeFrom] = useState('');
  const [inputTimeTo, setInputTimeTo] = useState('');

  const handleChangeTitle = event => {
    setInputText(event.target.value);
  };

  const handleChangeDescription = event => {
    setInputDescription(event.target.value);
  };
  const handleChangeDate = event => {
    setInputDate(event.target.value);
  };
  const handleChangeTimeFrom = event => {
    setInputTimeFrom(event.target.value);
  };

  const handleChangeTimeTo = event => {
    setInputTimeTo(event.target.value);
  };

  const submitFormData = event => {
    event.preventDefault();

    const data = {
      title: inputText,
      description: inputDescription,
      dateFrom: new Date(`${inputDate} ${inputTimeFrom}`),
      dateTo: new Date(`${inputDate} ${inputTimeTo}`),
    };
    fetchNewEvent(data).then(() => fetchEventsHandler());
    toggleModal(false);
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={handleToggle}>
            +
          </button>
          <form className="event-form" onSubmit={submitFormData}>
            <input
              onChange={handleChangeTitle}
              value={inputText}
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              required
            />
            <div className="event-form__time">
              <input
                onChange={handleChangeDate}
                value={inputDate}
                type="date"
                name="date"
                className="event-form__field"
                required
              />
              <input
                onChange={handleChangeTimeFrom}
                value={inputTimeFrom}
                type="time"
                name="startTime"
                className="event-form__field"
                required
              />
              <span>-</span>
              <input
                onChange={handleChangeTimeTo}
                value={inputTimeTo}
                type="time"
                name="endTime"
                className="event-form__field"
                required
              />
            </div>
            <textarea
              onChange={handleChangeDescription}
              value={inputDescription}
              name="description"
              placeholder="Description"
              className="event-form__field"
              required
            ></textarea>

            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Modal;

Modal.propTypes = {
  handleToggle: PropTypes.func.isRequired,
};
