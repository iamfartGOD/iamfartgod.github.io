const reverb = new Tone.Reverb().toDestination();
reverb.wet.value = 0;

document.getElementById('reverb-slider').addEventListener('input', (event) => {
    reverb.wet.value = event.target.value;
});


function playFart() {
    // Check if AudioContext is running
    if (Tone.context.state !== 'running') {
        Tone.context.resume();
    }

    // Create a player and connect it to the destination (speakers)
    const player = new Tone.Player("https://www.dropbox.com/scl/fi/t6hcklj6s6kmei5ps3qmc/Fart27.wav?rlkey=595brlojrpkqv52im7injknad&st=s9jlohey&dl=1").toDestination();
    player.autostart = true;
}


