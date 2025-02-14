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

// Function to play the sample using Howler.js
function playSample(fileName) {
    const sound = new Howl({
        src: [`${baseURL}${fileName}`],
        format: ['wav']
    });
    sound.play();
}

// Initialize the buttons when the page loads
window.onload = createButtons;
