let countdownInterval;

const init = () => {
  let seconds = document.getElementById('time-value').value;
  const countdownEl = document.getElementById('countdown');

  if (countdownInterval) {
    clearInterval(countdownInterval);
  }


  // eslint-disable-next-line require-jsdoc
  function countdown() {
    const horas = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutos = Math
        .floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const segundosFormatados = (seconds % 60).toString().padStart(2, '0');

    countdownEl.innerText = `${horas}:${minutos}:${segundosFormatados}`;
    seconds--;

    if (seconds < 0) {
      clearInterval(countdownInterval);
      countdownEl.innerText = 'Fim!';
    }
  }

  countdownInterval = setInterval(countdown, 1000);
};

const btn = document.getElementById('btn');

btn.addEventListener('click', (event) => {
  event.preventDefault();

  init();
});
