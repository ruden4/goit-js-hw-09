import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
}

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
        alert("Please choose a date in the future");
    } else {
        refs.startBtn.disabled = false;
        refs.startBtn.addEventListener('click', onTimerStart);
    };
  },
};
flatpickr('#datetime-picker', options);

function onTimerStart() {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
//   const ms = options.onClose(selectedDates[0]) - Date.now();

  // Remaining days
  refs.days = Math.floor(ms / day);
  // Remaining hours
  refs.hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  refs.minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  refs.seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
}


