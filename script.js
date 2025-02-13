const reverb = new Tone.Reverb().toDestination();
reverb.wet.value = 0;

document.getElementById('reverb-slider').addEventListener('input', (event) => {
    reverb.wet.value = event.target.value;
});

async function playFart() {
    const player = new Tone.Player("https://www.dropbox.com/s/yourfileid/fart-sound.mp3?dl=1").connect(reverb);
    await Tone.start();
    player.start();
}
