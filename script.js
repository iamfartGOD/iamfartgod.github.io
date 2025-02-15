// List of audio file names with capital F
const fileNames = [
    "Fart1.wav", "Fart2.wav", "Fart3.wav", "Fart4.wav", "Fart5.wav",
    "Fart6.wav", "Fart7.wav", "Fart8.wav", "Fart9.wav", "Fart10.wav",
    "Fart11.wav", "Fart12.wav", "Fart13.wav", "Fart14.wav", "Fart15.wav",
    "Fart16.wav", "Fart17.wav", "Fart18.wav", "Fart19.wav", "Fart20.wav",
    "Fart21.wav", "Fart22.wav", "Fart23.wav", "Fart24.wav", "Fart25.wav",
    "Fart26.wav", "Fart27.wav"
];

// Base URL for the GitHub folder where the samples are stored
const baseURL = "https://raw.githubusercontent.com/iamfartgod/iamfartgod.github.io/main/FartGodSamplePack/";

// Create AudioContext and Nodes
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let convolver = audioContext.createConvolver();
let dryGain = audioContext.createGain();
let wetGain = audioContext.createGain();
wetGain.gain.value = 0.8; // Set to 80% by default

// Load impulse response for reverb
const reverbURL = "https://raw.githubusercontent.com/iamfartgod/iamfartgod.github.io/main/impulse-response.wav"; 
fetch(reverbURL)
    .then(response => response.arrayBuffer())
    .then(data => audioContext.decodeAudioData(data))
    .then(buffer => {
        convolver.buffer = buffer;
    })
    .catch(error => console.error('Error loading impulse response:', error));

// Function to create buttons
function createButtons() {
    const container = document.getElementById("sample-buttons");
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.justifyContent = "center";
    container.style.gap = "10px";
    container.style.padding = "0 20px";

    fileNames.forEach((fileName, index) => {
        const button = document.createElement("button");
        button.innerText = `Sample ${index + 1}`;
        button.onclick = () => playSample(fileName);
        button.style.padding = "10px 15px";
        button.style.flex = "1 0 18%"; // 5 buttons per row with gap
        container.appendChild(button);
    });
}

// Function to play the sample with reverb effect
function playSample(fileName) {
    fetch(`${baseURL}${fileName}`)
        .then(response => response.arrayBuffer())
        .then(data => audioContext.decodeAudioData(data))
        .then(buffer => {
            const source = audioContext.createBufferSource();
            source.buffer = buffer;

            // Connect nodes for reverb
            source.connect(dryGain);
            source.connect(convolver);

            dryGain.connect(audioContext.destination);
            convolver.connect(wetGain);
            wetGain.connect(audioContext.destination);

            source.start();
        })
        .catch(error => console.error('Error loading audio sample:', error));
}

// Reverb mix control
const reverbSlider = document.getElementById("reverb-slider");
reverbSlider.value = 0.8; // Default to 80% on load
reverbSlider.addEventListener("input", (event) => {
    const mix = parseFloat(event.target.value);
    dryGain.gain.value = 1 - mix;
    wetGain.gain.value = mix;
});

// Initialize the buttons when the page loads
window.onload = () => {
    createButtons();
    initializeMusicPlayer();
};

// Music Player Section
const songList = [
    "Oh My God It's fartGOD.mp3", "fartGOD - Shit Yo Pants feat. Thric3, aka Thick Rice, aka Thick Rick.mp3", "Song3.wav" // Add your song file names here
];
const musicBaseURL = "https://raw.githubusercontent.com/iamfartgod/iamfartgod.github.io/main/FartGodMusic/";
let currentSongIndex = null;
let audio = new Audio();
const songListContainer = document.getElementById("song-list");
const nowPlaying = document.getElementById("current-song");
const playPauseBtn = document.getElementById("play-pause-btn");
const progressBar = document.getElementById("progress-bar");

// Function to initialize the music player
function initializeMusicPlayer() {
    songList.forEach((song, index) => {
        const li = document.createElement("li");
        li.innerText = song;
        li.onclick = () => playSong(index);
        songListContainer.appendChild(li);
    });

    playPauseBtn.onclick = togglePlayPause;
    progressBar.addEventListener("input", seek);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", nextSong);
}

// Function to play a selected song
function playSong(index) {
    if (index !== currentSongIndex) {
        currentSongIndex = index;
        audio.src = `${musicBaseURL}${songList[index]}`;
        nowPlaying.innerText = songList[index];
        audio.play();
        playPauseBtn.innerText = "Pause";
    } else {
        togglePlayPause();
    }
}

// Function to toggle play and pause
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.innerText = "Pause";
    } else {
        audio.pause();
        playPauseBtn.innerText = "Play";
    }
}

// Function to update the progress bar
function updateProgress() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
}

// Function to seek within the track
function seek(event) {
    const seekTime = (event.target.value / 100) * audio.duration;
    audio.currentTime = seekTime;
}

// Function to play the next song automatically
function nextSong() {
    if (currentSongIndex !== null) {
        const nextIndex = (currentSongIndex + 1) % songList.length;
        playSong(nextIndex);
    }
}
