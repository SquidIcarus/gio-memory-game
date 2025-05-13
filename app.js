
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

function playNote(note) {                                       // function to play the note when key is pressed
    console.log(`attempting to play note: ${note}`)
    const audio = document.getElementById(note);              // selects the audio based on the 'note' property from the pianoNotes array to match the ids w/ note names
    console.log(`audio element found:`, audio);
    if (audio) {                                               // verifies the audio element
        audio.currentTime = 0;                                  // resets audio playback to start from the beginning 
        audio.play()                                            // plays the audio file
    }
};

function handleStartBtn() {
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
    console.log(`cpu started with: ${currentNote}`)
    console.log(`cpu arp: ${cpuArp}`);
};

function handleCorrectNote() {
    arpLengthElem.textContent = `Arpeggio Length: ${cpuArp.length}`;

    setTimeout(() => {                                                     // wraps the block in the function to set the computer speed to 500
        currentNote = getRandomNote();
        cpuArp.push(currentNote);
        displayNoteElem.textContent = currentNote;
        keyLight(currentNote);
        playNote(currentNote);                                              // triggers playNote() when cpu plays a new note
        console.log(`cpuArp so far ${cpuArp}`)
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
            console.log(`WRONG NOTE, expected ${cpuArp[playerArp.length - 1]} you pressed ${note}`);
            playerArp = [];
            arpLengthElem.textContent = 'Arpeggio Length: 0';
            return;
        }

        if (playerArp.length === cpuArp.length) {
            console.log(`CORRECT`);
            setTimeout(() => {
                playerArp = [];
                handleCorrectNote();
            }, 500);

        }
    }
};



/*----------------------------- Event Listeners -----------------------------*/

startBtnElem.addEventListener('click', handleStartBtn);

keysElem.forEach(key => {
    key.addEventListener('click', handleKeys);
});

