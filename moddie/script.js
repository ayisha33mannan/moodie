// variables
const audio = document.querySelector('#audio');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const progress = document.querySelector('#progress');
const nowPlaying = document.querySelector('#now-playing');
const moodButtons = document.querySelectorAll('[data-mood]');
const body = document.body;

// mood → array of 2 songs each ( from pixabay.com )
const moodLibrary = {
    sad: ['songs/sad1.mp3', 'songs/sad-drama.mp3'],
    happy: ['songs/happy-cook.mp3', 'songs/happy-kids.mp3'],
    energetic: ['songs/cooking.mp3', 'songs/energetic-upbeat.mp3'],
    relaxed: ['songs/relax.mp3', 'songs/calm-bird.mp3']
};

// holder
let currentMood = null;
let currentSongIndex = 0;
let isPlaying = false;

// play a song from the current mood
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

// handle mood button click
moodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
    currentMood = btn.dataset.mood;
    currentSongIndex = 0;
    playSong();
    colorChange(); 
    });
});

// play/pause toggle
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

// previous song in current mood
prevBtn.addEventListener('click', () => {
    if (!currentMood) return;
    
    currentSongIndex = (currentSongIndex - 1 + moodLibrary[currentMood].length) % moodLibrary[currentMood].length;
    playSong();
});

// next song in current mood
nextBtn.addEventListener('click', () => {
    if (!currentMood) return;

    currentSongIndex = (currentSongIndex + 1) % moodLibrary[currentMood].length;
    playSong();
});

// progress bar update
audio.addEventListener('timeupdate', () => {
    const value = (audio.currentTime / audio.duration) * 100;
    progress.value = value || 0;
});

// seek when user drags progress bar
progress.addEventListener('input', () => {
    if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
    }
});
// background change 
const colorChange = () => {
    if (!currentMood) return;

    // variables
    const heading = document.querySelector("h1");
    const quest = document.querySelector("#quest "); 

    // Mood-based themes
    let theme = {
        background: "#FAF9EE",
        button: "#DCCFC0",
        text: "#000"
    };

    switch (currentMood) {
        case "sad":
            theme = {
                background: "#2C3E50",     // Dark Blue/Grey
                button: "#4e6175ff",        // Lighter Dark Blue
                text: "#ECF0F1"           // Light Text
            };
            break;
        case "happy":
            theme = {
                background: "#FFE3E1",     // Light Pink
                button: "#fdbbcaff",        // Pink buttons
                text: "#800020"           // Burgundy
            };
            break;
        case "energetic":
            theme = {
                background: "#FFF3B0",     // Light Yellow
                button: "#F9C80E",        // Yellow buttons
                text: "#5D2E8C"           // Purple
            };
            break;
        case "relaxed":
            theme = {
                background: "#C8E6C9",     // Light green
                button: "#9fd5a1ff",        // Softer green
                text: "#2E7D32"           // Deep green
            };
            break;
    }

    // Apply theme
    document.body.style.backgroundColor = theme.background;
    heading.style.color = theme.text;
    quest.style.color = theme.text;

    // Apply theme on buttons 
    moodButtons.forEach(btn => {
        btn.style.backgroundColor = theme.button;
        btn.style.color = theme.text;
    });
};
