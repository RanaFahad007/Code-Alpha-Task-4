const playlist = [
    {
        title: 'Acoustic Breeze',
        artist: 'Benjamin Tissot',
        url: 'https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3',
        duration: '2:37'
    },
    {
        title: 'Sunny',
        artist: 'Benjamin Tissot',
        url: 'https://www.bensound.com/bensound-music/bensound-sunny.mp3',
        duration: '2:20'
    },
    {
        title: 'Creative Minds',
        artist: 'Benjamin Tissot',
        url: 'https://www.bensound.com/bensound-music/bensound-creativeminds.mp3',
        duration: '2:27'
    },
    {
        title: 'Energy',
        artist: 'Benjamin Tissot',
        url: 'https://www.bensound.com/bensound-music/bensound-energy.mp3',
        duration: '2:59'
    },
    {
        title: 'Jazzy Frenchy',
        artist: 'Benjamin Tissot',
        url: 'https://www.bensound.com/bensound-music/bensound-jazzyfrenchy.mp3',
        duration: '3:17'
    },
    {
        title: 'Love',
        artist: 'Benjamin Tissot',
        url: 'https://www.bensound.com/bensound-music/bensound-love.mp3',
        duration: '2:52'
    }
];

let currentSongIndex = 0;
let isPlaying = false;
let isAutoplay = true;

const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play');
const pauseBtn = document.getElementById('pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const currentTimeEl = document.getElementById('current-time');
const totalDurationEl = document.getElementById('total-duration');
const playlistEl = document.getElementById('playlist');

function loadSong(index) {
    const song = playlist[index];
    audio.src = song.url;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    totalDurationEl.textContent = song.duration;
    updatePlaylistUI();
}

function playSong() {
    audio.play();
    isPlaying = true;
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    playSong();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    playSong();
}

function updateProgress() {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = percent;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
}

function setProgress(e) {
    const percent = e.target.value;
    audio.currentTime = (percent / 100) * audio.duration;
}

function setVolume(e) {
    audio.volume = e.target.value;
}

function formatTime(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updatePlaylistUI() {
    playlistEl.innerHTML = '';
    playlist.forEach((song, idx) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        if (idx === currentSongIndex) li.classList.add('active');
        li.addEventListener('click', () => {
            currentSongIndex = idx;
            loadSong(currentSongIndex);
            playSong();
        });
        playlistEl.appendChild(li);
    });
}

playBtn.addEventListener('click', playSong);
pauseBtn.addEventListener('click', pauseSong);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
progressBar.addEventListener('input', setProgress);
volumeBar.addEventListener('input', setVolume);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', () => {
    if (isAutoplay) nextSong();
    else pauseSong();
});
audio.addEventListener('loadedmetadata', () => {
    progressBar.value = 0;
    progressBar.max = 100;
    totalDurationEl.textContent = formatTime(audio.duration);
});

window.addEventListener('resize', updateProgress);

loadSong(currentSongIndex);
volumeBar.value = audio.volume;
updatePlaylistUI(); 