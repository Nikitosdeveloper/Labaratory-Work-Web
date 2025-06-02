const songs = new Map([
  ['Lighter', { url: 'D:/Универ/4 семестр/ПиWeb/Laba8/resource/Norway.m4a', artist: 'Норвегия' }],
  ['Baller', { url: 'D:/Универ/4 семестр/ПиWeb/Laba8/resource/Germany.m4a', artist: 'Германия' }],
  ['Espresso macchiato', { url: 'D:/Универ/4 семестр/ПиWeb/Laba8/resource/Estoniya.m4a', artist: 'Эстония' }],
  ['Bara bada bastu', { url: 'D:/Универ/4 семестр/ПиWeb/Laba8/resource/Sweden.m4a', artist: 'Швеция' }],
  ['New day will rise', { url: 'D:/Универ/4 семестр/ПиWeb/Laba8/resource/Israel.m4a', artist: 'Израиль' }],
]);

let audio = null;
let isPlaying = false;
let timeoutId = null;

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const intervalInput = document.getElementById('interval');
const inputSection = document.getElementById('inputSection');
const playerSection = document.getElementById('playerSection');
const currentSongDisplay = document.getElementById('currentSong');
const progressBar = document.getElementById('progressBar');

function getRandomSong() {
  const songKeys = Array.from(songs.keys());
  return songKeys[Math.floor(Math.random() * songKeys.length)];
}

function updateProgress() {
  if (audio && isPlaying && audio.duration && !isNaN(audio.duration) && !isNaN(audio.currentTime)) {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    if (audio.ended) {
      playNextSong();
    } else {
      requestAnimationFrame(updateProgress);
    }
  } else {
    // Если duration не определён, пропускаем обновление
    if (isPlaying) {
      requestAnimationFrame(updateProgress);
    }
  }
}

function playNextSong() {
  if (!isPlaying) return;
  
  // Полностью останавливаем предыдущее аудио
  if (audio) {
    audio.pause();
    audio.currentTime = 0; // Сбрасываем текущее время
    audio = null;
  }

  const songTitle = getRandomSong();
  const song = songs.get(songTitle);
  console.log('Attempting to play:', song.url); // Для отладки
  audio = new Audio(song.url);
  
  // Ждём, пока аудио будет готово к воспроизведению
  audio.addEventListener('canplay', () => {
    audio.play().catch(e => {
      console.error('Ошибка воспроизведения:', e);
      currentSongDisplay.textContent = `Ошибка загрузки: ${songTitle}`;
      playNextSong(); // Пропускаем песню и пробуем следующую
    });
  }, { once: true });

  currentSongDisplay.textContent = `${songTitle} - ${song.artist}`;
  requestAnimationFrame(updateProgress);

  const interval = parseInt(intervalInput.value) * 1000;
  timeoutId = setTimeout(playNextSong, (audio.duration || 10) * 1000 + interval); // Запасное значение, если duration не определён
}

startBtn.addEventListener('click', () => {
  const interval = parseInt(intervalInput.value);
  if (isNaN(interval) || interval < 1) {
    alert('Введите корректный интервал (не менее 1 секунды)');
    return;
  }
  isPlaying = true;
  inputSection.classList.add('hidden');
  playerSection.classList.remove('hidden');
  playNextSong();
});

stopBtn.addEventListener('click', () => {
  isPlaying = false;
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    audio = null;
  }
  if (timeoutId) clearTimeout(timeoutId);
  inputSection.classList.remove('hidden');
  playerSection.classList.add('hidden');
  currentSongDisplay.textContent = '';
  progressBar.value = 0;
});