/* eslint-disable require-jsdoc */
const countdownEl = document.getElementById('countdown');

const audio = document.getElementById('audio');

function updateCountdown(countdown) {
  countdownEl.innerText = countdown;
}

document.addEventListener('DOMContentLoaded', function() {
  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', function() {
    startButton.disabled = true;

    const hours = document.getElementById('hours-value').value;
    const minutes = document.getElementById('minutes-value').value;
    const seconds = document.getElementById('seconds-value').value;

    chrome.runtime
        .sendMessage({message: 'startTimer', hours, minutes, seconds});
  });
  const resetButton = document.getElementById('reset-button');
  resetButton.addEventListener('click', function() {
    chrome.runtime.reload();
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'updateCountdown') {
    updateCountdown(request.countdown);
  }
  if (request.message === 'playSound') {
    audio.play();
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'isPopupOpen') {
    sendResponse({popupOpen: true});
  }
});

function limitInput(element) {
  if (element.value.length > 2) {
    element.value = element.value.slice(0, 2);
  }
}

