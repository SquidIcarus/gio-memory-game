
/*-------------------------------- Constants --------------------------------*/
const pianoNotes = [
    { note: 'C', type: 'white' },
    { note: 'C#', type: 'black' },
    { note: 'D', type: 'white' },
    { note: 'D#', type: 'black' },
    { note: 'E', type: 'white' },
    { note: 'F', type: 'white' },
    { note: 'F#', type: 'black' },
    { note: 'G', type: 'white' },
    { note: 'G#', type: 'black' },
    { note: 'A', type: 'white' },
    { note: 'A#', type: 'black' },
    { note: 'B', type: 'white' }
];


/*-------------------------------- Variables --------------------------------*/

let currentNote = null;
let cpuArp = [];
let playerArp = [];
let computerSpeed = 500;  // set the computer speed to 500ms

/*------------------------ Cached Element References ------------------------*/

const startBtnElem = document.getElementById('start-btn');
const arpLengthElem = document.querySelector('.sequence-count');
const msgElem = document.getElementById('message');
const keysElem = document.querySelectorAll('.white-key, .black-key');
const displayNoteElem = document.getElementById('display-note');
const splashScreen = document.getElementById('splash-screen');
const startGameBtn = document.getElementById('lets-go');


/*-------------------------------- Functions --------------------------------*/

function getRandomNote() {
    const randomIndex = Math.floor(Math.random() * pianoNotes.length);
    return pianoNotes[randomIndex].note;
};

function keyLight(note) {
    const key = document.querySelector(`[data-note="${note}"]`);
    if (key) {
        key.classList.add('active');
    }
};

function keyLightOff(note) {
    const key = document.querySelector(`[data-note="${note}"]`);
    if (key) {
        key.classList.remove('active');
    }
};

function playNote(note) {
    const audio = document.getElementById(note);
    if (audio) {
        audio.currentTime = 0;
        audio.play()
    }
};

function handleStartBtn() {
    startBtnElem.textContent = 'Meow!';
    arpLengthElem.textContent = `Arpeggio Length: `;
    displayMessage(`Let's go!`);
    currentNote = null;
    cpuArp = [];
    playerArp = [];
    currentNote = getRandomNote();
    cpuArp.push(currentNote);
    displayNoteElem.textContent = currentNote;
    keyLight(currentNote);
    playNote(currentNote);                                                 // triggers the playNote() to play audio when cpu plays a note                                        
    setTimeout(() => {
        displayNoteElem.textContent = '';
        keyLightOff(currentNote);
    }, 500);
};

function playCpuSequence(sequence, callback) {
    let index = 0;
    function playNextNote() {
        if (index < sequence.length) {
            const note = sequence[index];
            displayNoteElem.textContent = note;
            keyLight(note);
            playNote(note);
            setTimeout(() => {
                keyLightOff(note);
                displayNoteElem.textContent = '';
                index++;
                setTimeout(playNextNote, 300);
            }, 500);
        } else if (callback) {
            callback();
        }
    }
    setTimeout(playNextNote, 300);
};

function handleCorrectNote() {
    arpLengthElem.textContent = `Arpeggio Length: ${cpuArp.length}`;
    if (cpuArp.length === 9) {
        displayMessage(`Congratulations, you're a memory arpeggiator master! See how much further you can get!`)
    }
    currentNote = getRandomNote();
    cpuArp.push(currentNote);
    playCpuSequence(cpuArp, () => {
        playerArp = [];
    })
};


function handleKeys(event) {

    if (cpuArp.length === 0) return;

    if (event.target.classList.contains('white-key') || event.target.classList.contains('black-key')) {
        const note = event.target.getAttribute('data-note');
        displayMessage(`Good Luck!`);
        playerArp.push(note);
        displayNoteElem.textContent = note;
        keyLight(note);
        playNote(note);
        console.log(`you pressed ${note}`)
        setTimeout(() => {
            displayNoteElem.textContent = '';
            keyLightOff(note);
        }, 500);


        if (note !== cpuArp[playerArp.length - 1]) {
            playerArp = [];
            startBtnElem.textContent = 'Go!';
            arpLengthElem.textContent = `${cpuArp.length} note arpeggio, wow!`;
            displayMessage(`Game over ☠️`);
            return;
        }

        if (playerArp.length === cpuArp.length) {
            setTimeout(() => {
                playerArp = [];
                handleCorrectNote();
            }, 500);

        }
    }
};

function displayMessage(text, type = 'info') {
    msgElem.textContent = text;
    msgElem.className = 'message';
    msgElem.classList.add(type);
}



/*----------------------------- Event Listeners -----------------------------*/

startBtnElem.addEventListener('click', handleStartBtn);

keysElem.forEach(key => {
    key.addEventListener('click', handleKeys);
});

startGameBtn.addEventListener('click', () => {
    splashScreen.style.display = 'none';
    document.querySelector('main').classList.add('show-game');
    document.querySelector('footer').classList.add('show-game');
});
