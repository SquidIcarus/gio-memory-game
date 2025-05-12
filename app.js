
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

function handleStartBtn() {                                              // function to handle the start button
    currentNote = null;                                                  // resets game (there is no current note)
    cpuArp = [];                                                         // resets game, computer starts with empty arpeggio array
    playerArp = [];                                                      // resets game, player starts with empty arpeggio array
    currentNote = getRandomNote();                                       // a random note is stored into currentNote with the getRandomNote() function
    cpuArp.push(currentNote);                                            // adds the currentNote to the cpuArp array                                                    
    displayNoteElem.textContent = currentNote;                           // renders the currentNote onto the page through the displayNoteElem 
    setTimeout(() => {                                                  // function to only display the note for 2 sec
        displayNoteElem.textContent = '';                               //  sets the display to an empty string
    }, 1000);                                                           // after 1000ms (1sec)             
    console.log(`cpu started with: ${currentNote}`)
    console.log(`cpu arp: ${cpuArp}`);
};

function handleCorrectNote() {
    currentNote = getRandomNote();
    cpuArp.push(currentNote);
    displayNoteElem.textContent = currentNote;
    console.log(`cpuArp so far ${cpuArp}`)
    setTimeout(() => {                                                  // function to only display the note for 2 sec
        displayNoteElem.textContent = '';                               //  sets the display to an empty string
    }, 1000);                                                           // after 1000ms (1sec)
};


function handleKeys(event) {

    if (cpuArp.length === 0) return;                                                                            // Only proceed if the game has started (cpuArp has notes)

    if (event.target.classList.contains('white-key') || event.target.classList.contains('black-key')) {
        const note = event.target.getAttribute('data-note');
        playerArp.push(note);
        displayNoteElem.textContent = note;
        console.log(`you pressed ${note}`)
        setTimeout(() => {                                                  // function to only display the note for 2 sec
            displayNoteElem.textContent = '';                               //  sets the display to an empty string
        }, 1000);                                                           // after 1000ms (1sec)


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
            }, 1000);

        }
    }
};

/*----------------------------- Event Listeners -----------------------------*/

startBtnElem.addEventListener('click', handleStartBtn);

keysElem.forEach(key => {
    key.addEventListener('click', handleKeys);
});

