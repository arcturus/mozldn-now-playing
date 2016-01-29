document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('next').addEventListener('click', nextSong);
  document.getElementById('prev').addEventListener('click', prevSong);
  if (document.getElementById('play')) {
    document.getElementById('play').addEventListener('click', playSong);
  }
  if (document.getElementById('pause')) {
    document.getElementById('pause').addEventListener('click', pauseSong);
  }
});

function hideControls() {
  document.getElementById('controls').style.display='none';
}

function reload() {
  document.location.reload();
}

function nextSong() {
  hideControls();
  fetch('/controls/next').then(reload, reload);
}

function prevSong() {
  hideControls();
  fetch('/controls/prev').then(reload, reload);
}

function pauseSong() {
  hideControls();
  fetch('/controls/pause').then(reload, reload);
}

function playSong() {
  hideControls();
  fetch('/controls/play').then(reload, reload);
}