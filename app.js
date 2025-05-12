
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

/*------------------------ Cached Element References ------------------------*/

const startBtnElem = document.getElementById('start-btn');
const arpLengthElem = document.querySelector('.sequence-count');
const msgElem = document.getElementById('message');
const keysElem = document.querySelectorAll('.white-key, .black-key');
// const blackKeysElem = document.getElementById('black-keys');
// const whiteKeysElem = document.getElementById('white-keys');
const displayNoteElem = document.getElementById('display-note');


/*-------------------------------- Functions --------------------------------*/

function getRandomNote() {                                               // function to generate a random note
    const randomIndex = Math.floor(Math.random() * pianoNotes.length);   // stores the random note using Math.floor method in randomIndex
    return pianoNotes[randomIndex].note;                                 // returns the note being played from the .note property of the pianoNotes array of note objects
};

function keyLight(note) {                                                // function to highlight a note when it is played
    const key = document.querySelector(`[data-note="${note}"]`);         // caches the data-note="note" selector, stores in 'key'.
    if (key) {                                                           // verifies the key 'data-note' element
        key.classList.add('active');                                     // adds the CSS class 'active' to the element
    }
};

function keyLightOff(note) {                                          // function to remove the highlight
    const key = document.querySelector(`[data-note="${note}"]`);
    if (key) {
        key.classList.remove('active');
    }
};

function handleStartBtn() {
    currentNote = null;
    cpuArp = [];
    playerArp = [];
    currentNote = getRandomNote();
    cpuArp.push(currentNote);
    displayNoteElem.textContent = currentNote;
    keyLight(currentNote);                                              // uses the keyLight function to highlight the key
    setTimeout(() => {                                                  // function to only display the note for 500ms
        displayNoteElem.textContent = '';
        keyLightOff(currentNote);                                       // remove highlight after 500ms
    }, 500);
    console.log(`cpu started with: ${currentNote}`)
    console.log(`cpu arp: ${cpuArp}`);
};

function handleCorrectNote() {
    arpLengthElem.textContent = `Arpeggio Length: ${cpuArp.length}`;
    currentNote = getRandomNote();
    cpuArp.push(currentNote);
    displayNoteElem.textContent = currentNote;
    keyLight(currentNote);
    console.log(`cpuArp so far ${cpuArp}`)
    setTimeout(() => {                                                  // function to only display the note for 2 sec
        displayNoteElem.textContent = '';                               //  sets the display to an empty string
        keyLightOff(currentNote);
    }, 500);
};


function handleKeys(event) {

    if (cpuArp.length === 0) return;

    if (event.target.classList.contains('white-key') || event.target.classList.contains('black-key')) {
        const note = event.target.getAttribute('data-note');
        playerArp.push(note);
        displayNoteElem.textContent = note;
        keyLight(note);
        console.log(`you pressed ${note}`)
        setTimeout(() => {
            displayNoteElem.textContent = '';
            keyLightOff(note);
        }, 500);


        if (note !== cpuArp[playerArp.length - 1]) {                                                            // if player input !== the last note of the cpuArp
            console.log(`WRONG NOTE, expected ${cpuArp[playerArp.length - 1]} you pressed ${note}`);
            playerArp = [];                                                                                     // Resets player sequence
            return;                                                                                             // stops the function if the note played !== the last note of the array
        }

        if (playerArp.length === cpuArp.length) {                                                               // if player array === cpu array
            console.log(`CORRECT`);                                                                             // correct!
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

