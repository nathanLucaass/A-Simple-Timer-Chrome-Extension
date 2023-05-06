const countdownEl = document.getElementById('countdown');


// eslint-disable-next-line require-jsdoc
function updateCountdown(countdown) {
  countdownEl.innerText = countdown;
}


document.addEventListener('DOMContentLoaded', function() {
  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', function() {
    const hours = document.getElementById('hours-value').value;
    const minutes = document.getElementById('minutes-value').value;
    const seconds = document.getElementById('minutes-value').value;

    if (hours === '') {
      hours = 0;
    }
    if (minutes === '') {
      minutes = 0;
    }
    if (seconds === '') {
      seconds = 0;
    }

    chrome.runtime.sendMessage({message: 'startTimer', hours, minutes, seconds});
  });
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'updateCountdown') {
    updateCountdown(request.countdown);
  }
});
