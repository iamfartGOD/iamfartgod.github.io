const reverb = new Tone.Reverb().toDestination();
reverb.wet.value = 0;

document.getElementById('reverb-slider').addEventListener('input', (event) => {
    reverb.wet.value = event.target.value;
});

async function playFart() {
    const player = new Tone.Player("https://www.dropbox.com/scl/fi/t6hcklj6s6kmei5ps3qmc/Fart27.wav?rlkey=595brlojrpkqv52im7injknad&st=8vca83fc&dl=1").connect(reverb);
    await Tone.start();
    player.start();
}
