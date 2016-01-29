document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('next').addEventListener('click', nextSong);
  document.getElementById('prev').addEventListener('click', prevSong);
});

function nextSong() {
  fetch('/controls/next').then(() => {
    document.reload();
  });
}

function prevSong() {
  fetch('/controls/prev').then(() => {
    document.reload();
  });
}