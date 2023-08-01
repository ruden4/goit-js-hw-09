import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
    inputDate: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
}

let timerId = null; // задаем переменную для хранения ID таймера для дальнейшего сброса.
refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onTimerStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
        alert("Please choose a date in the future");
    } else {
        refs.startBtn.disabled = false;
    };
  },
};

flatpickr('#datetime-picker', options);

//Функция запуска таймера через SetInterval//
function onTimerStart() {
    refs.inputDate.disabled = true;
    refs.startBtn.disabled = true;
    timerId = setInterval(updateTimer, 1000);
}

//
function updateTimer() {
    const currentTime = new Date(refs.inputDate.value); // принимаем выбранную дату из инпута//
    const deltaTime = currentTime - Date.now();//вычисляем эту дату в мс, (выбранная дата - текущая дата)//
    const { days, hours, minutes, seconds } = convertMs(deltaTime); //деструктурируем и передаем функцию в конвертер//

    //присваивание значаений в textContent всех элементов с подставлением "0" при необходимости
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);

    if (deltaTime < 1000) {
        clearInterval(timerId);
        refs.inputDate.disabled = false;
    }
}

//Функция конвертации милисекунд в секунды/минуты/часы/дни//
function convertMs(ms) {
      const seconds = Math.floor(ms / 1000);
      const minutes = Math.floor(seconds / 60) % 60;
      const hours = Math.floor(seconds / 3600) % 24;
      const days = Math.floor(seconds / 86400);
  
      return { days, hours, minutes, seconds: seconds % 60 };
  }

//Функция для подставки 0//
function addLeadingZero(value) {
    return `${value}`.padStart(2, '0');
}


