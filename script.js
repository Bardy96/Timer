const startBtn = document.querySelector('.start')
const pauseBtn = document.querySelector('.pause')
const stopBtn = document.querySelector('.stop')
const removeBtn = document.querySelector('.remove')
const archiveBtn = document.querySelector('.archive')
const stopwatch = document.querySelector('.stopwatch')
const time = document.querySelector('.time')
const timeList = document.querySelector('.time-list')

const infoBtn = document.querySelector('.info')
const modalShadow = document.querySelector('.modal-shadow')
const closeModalBtn = document.querySelector('.close')

let countTime;
let minutes = 0;
let seconds = 0;

let timeArray = []

const handleStart = () => {
    clearInterval(countTime);

    countTime = setInterval(() => {

        if (seconds < 9) {
            seconds++
            stopwatch.textContent = `${minutes}:0${seconds}`
        } else if (seconds >= 9 && seconds < 59) {
            seconds++
            stopwatch.textContent = `${minutes}:${seconds}`
        } else {
            minutes++;
            seconds = 0;
            stopwatch.textContent = `${minutes}:00`
        }

    }, 1000)
}

const handleStop = () => {

    time.innerHTML = `Last time: ${stopwatch.textContent}`

    if (stopwatch.textContent !== '0:00') {
        time.style.visibility = 'visible';
        timeArray.push(stopwatch.textContent)
    }

    clearStuff()
}

const handlePause = () => {
    clearInterval(countTime);
}

const handleReset = () => {
    time.style.visibility = 'hidden';
    timeArray = []
    clearStuff()
}

const clearStuff = () => {
    clearInterval(countTime)
    stopwatch.textContent = '0:00'
    timeList.textContent = ''
    seconds = 0;
    minutes = 0;
}

const showArchive = () => {

    timeList.textContent = '';
    let num = 1;
    timeArray.forEach(time => {
        const newTime = document.createElement('li')
        newTime.innerHTML = `Time no ${num}: <span>${time}</span>`

        timeList.appendChild(newTime)
        num++;
    })
}

const showModal = () => { 
    if(!(modalShadow.style.display === 'block')) {
        modalShadow.style.display = 'block'
    } else {
        modalShadow.style.display = 'none'
    }

    modalShadow.classList.toggle('modal-animation')
 }

startBtn.addEventListener('click', handleStart)
pauseBtn.addEventListener('click', handlePause)
stopBtn.addEventListener('click', handleStop)
removeBtn.addEventListener('click', handleReset)
archiveBtn.addEventListener('click', showArchive)
infoBtn.addEventListener('click', showModal)
closeModalBtn.addEventListener('click', showModal)
window.addEventListener('click', e => {
    e.target === modalShadow ? showModal() : false
})