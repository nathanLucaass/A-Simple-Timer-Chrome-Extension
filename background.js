chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  let countdownInterval;
  if (request.message === 'startTimer') {
    const reqHours = parseInt(request.hours);
    const reqMinutes = parseInt(request.minutes);
    const reqSeconds = parseInt(request.seconds);

    let time = (reqSeconds + (reqMinutes * 60) + (reqHours * 3600 ));

    countdownInterval = setInterval(function() {
      const hours = Math.floor(time / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((time % 3600) / 60)
          .toString()
          .padStart(2, '0');
      const formatedSeconds = (time % 60).toString().padStart(2, '0');

      chrome.runtime.sendMessage({
        message: 'updateCountdown',
        countdown: `${hours}:${minutes}:${formatedSeconds}`,
      });

      time--;

      if (time < 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);
  }
});
