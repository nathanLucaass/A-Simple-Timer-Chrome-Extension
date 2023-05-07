/* eslint-disable require-jsdoc */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'startTimer') {
    let reqHours = parseInt(request.hours);
    let reqMinutes = parseInt(request.minutes);
    let reqSeconds = parseInt(request.seconds);
    if (typeof reqHours !== 'number' || isNaN(reqHours)) {
      reqHours = 0;
    }
    if (typeof reqMinutes !== 'number' || isNaN(reqMinutes)) {
      reqMinutes = 0;
    }
    if (typeof reqSeconds !== 'number' || isNaN(reqSeconds)) {
      reqSeconds = 0;
    }

    let time = reqSeconds + reqMinutes * 60 + reqHours * 3600;

    countdownInterval = setInterval(function() {
      const hours = Math.floor(time / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((time % 3600) / 60)
          .toString()
          .padStart(2, '0');
      const seconds = (time % 60).toString().padStart(2, '0');

      chrome.runtime.sendMessage({
        message: 'updateCountdown',
        countdown: `${hours}:${minutes}:${seconds}`,
      });

      time--;

      if (time < 0) {
        clearInterval(countdownInterval);
        chrome.runtime.sendMessage({
          message: 'updateCountdown',
          countdown: 'END',
        });
        chrome.runtime.sendMessage({
          message: 'playSound',
        });
      }
    }, 1000);
  }
});
