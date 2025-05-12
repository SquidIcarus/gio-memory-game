
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

// console.log(pianoNotes);



/*-------------------------------- Variables --------------------------------*/

let currentNote = null;          // a place to store the current note that the user needs to click
let cpuArp = [];                 // a place to store the computer generated sequence in order starting with an empty array
let playerArp = [];              // a place to store the player generated sequence in order starting with an empty array

/*------------------------ Cached Element References ------------------------*/

const startBtnElem = document.getElementById('start-btn');
const arpLengthElem = document.querySelector('.sequence-count');
const msgElem = document.getElementById('message');
const keysElem = document.querySelectorAll('.white-key, .black-key');
// const blackKeysElem = document.getElementById('black-keys');
// const whiteKeysElem = document.getElementById('white-keys');
const displayNoteElem = document.getElementById('display-note');

// console.log(startBtnElem);
// console.log(arpLengthElem);
// console.log(msgElem);
// console.log(blackKeysElem);
// console.log(whiteKeysElem);
// console.log(displayNoteElem);
// console.log(keysElem);

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
    console.log(`cpu started with: ${currentNote}`)
    console.log(`cpu arp: ${cpuArp}`);
};

function handleCorrectNote() {                                         // function to handle next step when correct note is pressed
    currentNote = getRandomNote();                                     // currentNote is now a new random note using getRandomNote
    cpuArp.push(currentNote);                                          // the new note is stored in the cpuArp array 
    displayNoteElem.textContent = currentNote;
    console.log(cpuArp);
}


function handleKeys(event) {
    if (event.target.classList.contains('white-key') || event.target.classList.contains('black-key')) {
        const note = event.target.getAttribute('data-note');
        playerArp.push(note);
        displayNoteElem.textContent = note;
        // console.log(note);
        // console.log(playerArp);

        if (playerArp.length === cpuArp.length) {
            console.log(`${note} is correct!`);
            handleCorrectNote();
        // } else {
        //     console.log(`you pressed the wrong note`);

        }
    }
};

// function handleBlackKeys(event) {
//     if (event.target.classList.contains('black-key')) {
//         const note = event.target.getAttribute('data-note');
//         playerArp.push(note);
//         displayNoteElem.textContent = note;

//     } if (cpuArp.toString() === playerArp.toString()) {
//         handleCorrectNote();

//     } else if (cpuArp.toString() !== playerArp.toString()) {
//         console.log(`INCORRECT try again!`)
//         console.log(playerArp);
//     }
// };





/*----------------------------- Event Listeners -----------------------------*/

startBtnElem.addEventListener('click', handleStartBtn);

keysElem.forEach(key => {
    key.addEventListener('click', handleKeys);
});

// blackKeysElem.addEventListener('click', handleBlackKeys);