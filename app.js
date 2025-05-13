
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
// const blackKeysElem = document.getElementById('black-keys');
// const whiteKeysElem = document.getElementById('white-keys');
const displayNoteElem = document.getElementById('display-note');


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

function handleCorrectNote() {
    arpLengthElem.textContent = `Arpeggio Length: ${cpuArp.length}`;

    setTimeout(() => {                                                     // wraps the block in the function to set the computer speed to 500
        currentNote = getRandomNote();
        cpuArp.push(currentNote);
        displayNoteElem.textContent = currentNote;
        keyLight(currentNote);
        playNote(currentNote);                                              // triggers playNote() when cpu plays a new note        
        setTimeout(() => {
            displayNoteElem.textContent = '';
            keyLightOff(currentNote);
        }, 500);
    }, computerSpeed);                                                      // variable that stores the speed, currently at 500
};


function handleKeys(event) {

    if (cpuArp.length === 0) return;

    if (event.target.classList.contains('white-key') || event.target.classList.contains('black-key')) {
        const note = event.target.getAttribute('data-note');
        displayMessage(`Good Luck!`);
        playerArp.push(note);
        displayNoteElem.textContent = note;
        keyLight(note);
        playNote(note);                             // triggers playNote() when player presses a key
        console.log(`you pressed ${note}`)
        setTimeout(() => {
            displayNoteElem.textContent = '';
            keyLightOff(note);
        }, 500);


        if (note !== cpuArp[playerArp.length - 1]) {
            playerArp = [];
            arpLengthElem.textContent = `Great Job! ${cpuArp.length} note arpeggio, wow!`;
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

