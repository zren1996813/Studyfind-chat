function startChat() {

}

function sendMessage() {

}

function getMessages() {

}

function getUser() {

}

function formatTime(time) {
  const timestamp = time.toDate();

  if(!timestamp) return '';

  const rawHours = timestamp && timestamp.getHours();
  const rawMinutes = timestamp && timestamp.getMinutes();

  const meridian = rawHours > 12 ? 'pm' : 'am';
  const hours = rawHours % 12;
  const minutes = (rawMinutes > 9 || '0') + rawMinutes;

  return `${hours}:${minutes}${meridian}`;
}

function formatDate(date) {
  const timestamp = date.toDate();

  if(!timestamp) return '';

  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const SUFFIX = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'st'];

  const day = timestamp.getDate();
  const month = timestamp.getMonth();
  const year = 1900 + timestamp.getYear();

  return `${MONTHS[month]} ${day}${SUFFIX[day]}, ${year}`;
}

export { formatTime, formatDate }
