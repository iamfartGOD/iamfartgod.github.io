// List of audio file names (change these as needed)
const fileNames = [
    "fart1.wav", "fart2.wav", "fart3.wav", "fart4.wav", "fart5.wav",
    "fart6.wav", "fart7.wav", "fart8.wav", "fart9.wav", "fart10.wav",
    "fart11.wav", "fart12.wav", "fart13.wav", "fart14.wav", "fart15.wav",
    "fart16.wav", "fart17.wav", "fart18.wav", "fart19.wav", "fart20.wav",
    "fart21.wav", "fart22.wav", "fart23.wav", "fart24.wav", "fart25.wav",
    "fart26.wav", "fart27.wav"
];

// Base URL for the GitHub folder where the samples are stored
const baseURL = "https://raw.githubusercontent.com/USERNAME/REPOSITORY_NAME/BRANCH_NAME/";

// Function to create buttons
function createButtons() {
    const container = document.getElementById("sample-buttons");
    fileNames.forEach((fileName, index) => {
        const button = document.createElement("button");
        button.innerText = `Sample ${index + 1}`;
        button.onclick = () => playSample(fileName);
        container.appendChild(button);
    });
}

// Function to play the sample
function playSample(fileName) {
    // Check if AudioContext is running
    if (Tone.context.state !== 'running') {
        Tone.context.resume();
    }

    const player = new Tone.Player(`${baseURL}${fileName}`).toDestination();
    player.autostart = true;
}

// Initialize the buttons when the page loads
window.onload = createButtons;
