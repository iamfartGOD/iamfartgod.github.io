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
const baseURL = "https://raw.githubusercontent.com/iamfartgod/iamfartgod.github.io/main/FartGodSamplePack";

// Create AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let convolver = audioContext.createConvolver();
let dryGain = audioContext.createGain();
let wetGain = audioContext.createGain();
wetGain.gain.value = 0;

// Load impulse response for reverb
const reverbURL = "https://example.com/impulse-response.wav"; // Replace with a valid URL to an impulse response file
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
    fileNames.forEach((fileName, index) => {
        const button = document.createElement("button");
        button.innerText = `Sample ${index + 1}`;
        button.onclick = () => playSample(fileName);
        button.style.margin = "10px"; // Add margin for better layout
        container.appendChild(button);
    });
}

// Function to play the sample with reverb effect
function playSample(fileName) {
    const sound = new Howl({
        src: [`${baseURL}${fileName}`],
        format: ['wav'],
        onplay: function() {
            const source = audioContext.createMediaElementSource(sound._sounds[0]._node);
            source.connect(dryGain);
            source.connect(convolver);
            dryGain.connect(audioContext.destination);
            convolver.connect(wetGain);
            wetGain.connect(audioContext.destination);
        }
    });
    sound.play();
}

// Reverb mix control
const reverbSlider = document.getElementById("reverb-slider");
reverbSlider.addEventListener("input", (event) => {
    const mix = parseFloat(event.target.value);
    dryGain.gain.value = 1 - mix;
    wetGain.gain.value = mix;
});

// Initialize the buttons when the page loads
window.onload = createButtons;

