
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let intervalId = null;

startBtn.addEventListener('click',startChangingColors);
stopBtn.addEventListener('click',stopChangingColors);

function startChangingColors () {
    intervalId = setInterval(()=>{
body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`
    },1000)
    startBtn.disabled = true;
};

function stopChangingColors () {
    clearInterval(intervalId);
    // startBtn.disabled = false;
}
