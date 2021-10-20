const baseUrl = 'https://6141977c357db50017b3db7a.mockapi.io/api/v1/tasks';

export const fetchEvents = () =>
  fetch(baseUrl).then(response => {
    if (!response.ok) {
      throw new Error("Internal Server Error. Can't display events");
    }
    return response.json();
  });

export const fetchNewEvent = eventObj =>
  fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventObj),
  }).then(response => {
    if (!response.ok) {
      throw new Error("Internal Server Error. Can't create event");
    }
    return response.json();
  });

export const deleteEvents = eventId =>
  fetch(`${baseUrl}/${eventId}`, {
    method: 'DELETE',
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  });

export const createObjectForm = () => {
  const form = document.querySelector('.event-form');
  const userData = Object.fromEntries(new FormData(form));
  const { title, description, date, startTime, endTime } = userData;

  return {
    title,
    description,
    dateFrom: new Date(`${date} ${startTime}`),
    dateTo: new Date(`${date} ${endTime}`),
  };
};
