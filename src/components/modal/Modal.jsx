import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './modal.scss';
import { fetchNewEvent } from '../../gateway/gateWayEvents';

const Modal = ({ toggleModal, handleToggle, fetchEventsHandler }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    dateTo: '',
    dateFrom: '',
  });

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const submitFormData = event => {
    event.preventDefault();

    const data = {
      ...formData,
      dateFrom: new Date(`${formData.date} ${formData.dateFrom}`),
      dateTo: new Date(`${formData.date} ${formData.dateTo}`),
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
              onChange={handleChange}
              value={formData.title}
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              required
            />
            <div className="event-form__time">
              <input
                onChange={handleChange}
                value={formData.date}
                type="date"
                name="date"
                className="event-form__field"
                required
              />
              <input
                onChange={handleChange}
                value={formData.dateFrom}
                type="time"
                name="dateFrom"
                className="event-form__field"
                required
              />
              <span>-</span>
              <input
                onChange={handleChange}
                value={formData.dateTo}
                type="time"
                name="dateTo"
                className="event-form__field"
                required
              />
            </div>
            <textarea
              onChange={handleChange}
              value={formData.description}
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
