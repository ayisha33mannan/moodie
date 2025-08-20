const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const nowPlaying = document.getElementById('now-playing');
const moodButtons = document.querySelectorAll('[data-mood]');
// Mood → Array of 2 songs each ( from pixabay.com )
const moodLibrary = {
    sad: ['songs/sad1.mp3', 'songs/sad-drama.mp3'],
    happy: ['songs/happy-cook.mp3', 'songs/happy-kids.mp3'],
    energetic: ['songs/cooking.mp3', 'songs/energetic-upbeat.mp3'],
    relaxed: ['songs/relax.mp3', 'songs/calm-bird.mp3']
};

let currentMood = null;
let currentSongIndex = 0;
let isPlaying = false;

// Play a song from the current mood
const playSong = () => {
    const songList = moodLibrary[currentMood];
    const song = songList[currentSongIndex];

    if (!song) return;

    audio.src = song;
    audio.play();
    isPlaying = true;
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    nowPlaying.textContent = `${currentMood.toUpperCase()} - Song No. ${currentSongIndex + 1}`;
};

// Handle mood button click
moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
    currentMood = btn.dataset.mood;
    currentSongIndex = 0;
    playSong();
    colorChange(); 
    });
});

// Play/pause toggle
playBtn.addEventListener('click', () => {
    if (!audio.src) return;
    
    if (isPlaying) {
        audio.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        audio.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// Previous song in current mood
prevBtn.addEventListener('click', () => {
    if (!currentMood) return;
    
    currentSongIndex = (currentSongIndex - 1 + moodLibrary[currentMood].length) % moodLibrary[currentMood].length;
    playSong();
});

// Next song in current mood
nextBtn.addEventListener('click', () => {
    if (!currentMood) return;

    currentSongIndex = (currentSongIndex + 1) % moodLibrary[currentMood].length;
    playSong();
});

// Progress bar update
audio.addEventListener('timeupdate', () => {
    const value = (audio.currentTime / audio.duration) * 100;
    progress.value = value || 0;
});

// Seek when user drags progress bar
progress.addEventListener('input', () => {
    if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
    }
});
//background change 
const colorChange = () => {
    if (!currentMood) return;
    
    if (currentMood === "sad") {
        body.style.backgroundColor ="#ff5252";
    }
    else if (currentMood === "relaxed"){
        body.style.backgroundColor = "#7ab651";
    }
    else if (currentMood === "energetic"){
        body.style.backgroundColor ="#00161e";
    }
    else if (currentMood === "happy"){
        body.style.backgroundColor = "#b70868";
    }
    else  {
        body.style.backgroundColor =" #FAF9EE"};
}