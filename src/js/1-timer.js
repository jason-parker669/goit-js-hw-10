import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
const startButton = document.querySelector('button');
const dateSelector = document.getElementById('datetime-picker');
startButton.disabled = true;

const timeDisplay = {
  days:document.querySelector('[data-days]'),
  hours:document.querySelector('[data-hours]'),
  minutes:document.querySelector('[data-minutes]'),
  seconds:document.querySelector('[data-seconds]'),
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
      if (userSelectedDate < options.defaultDate) {
        console.log(userSelectedDate);
        startButton.disabled = true;
        iziToast.warning({
          title: 'Warning!',
          message: 'Please select a date in the future.',
          position: 'topRight'
                });
        return;
      }
      else { 
        startButton.disabled = false;
      }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function showTimer() { 
  const convertedTimeLeft = convertMs(userSelectedDate-options.defaultDate);
  timeDisplay.days.textContent = String(convertedTimeLeft.days).padStart(2, '0');
  timeDisplay.hours.textContent = String(convertedTimeLeft.hours).padStart(2, '0');
  timeDisplay.minutes.textContent = String(convertedTimeLeft.minutes).padStart(2, '0');
  timeDisplay.seconds.textContent = String(convertedTimeLeft.seconds).padStart(2, '0');
  userSelectedDate -= 1000;

}

function processButtonClick() { 
  startButton.disabled = true;
  dateSelector.disabled = true;
  const timerRefresh = setInterval(showTimer, 1000);
  setTimeout(() => {
    clearInterval(timerRefresh);
    dateSelector.disabled = false;
    options.defaultDate = new Date();
  },userSelectedDate - options.defaultDate+1000);
}

flatpickr("#datetime-picker", options);

startButton.addEventListener("click", processButtonClick);


