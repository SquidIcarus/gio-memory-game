
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

console.log(pianoNotes);



/*-------------------------------- Variables --------------------------------*/

let currentNote = null;          // a place to store the current note that the user needs to click
let currentArp = [];            // a place to store the sequence in order starting with an empty array

/*------------------------ Cached Element References ------------------------*/

const startBtnElem = document.getElementById('start-btn');
const arpLengthElem = document.querySelector('.sequence-count');
const msgElem = document.getElementById('message');
const blackKeysElem = document.getElementById('black-keys');
const whiteKeysElem = document.getElementById('white-keys');
const displayNoteElem = document.getElementById('display-note');

// console.log(startBtnElem);
// console.log(arpLengthElem);
// console.log(msgElem);
// console.log(blackKeysElem);
// console.log(whiteKeysElem);
// console.log(displayNoteElem);

/*-------------------------------- Functions --------------------------------*/

function getRandomNote() {                                               // function to generate a random note
    const randomIndex = Math.floor(Math.random() * pianoNotes.length);   // stores the random note using Math.floor method in randomIndex
    return pianoNotes[randomIndex].note;                                 // returns the note being played
};

function handleStartBtn() {                                              // function to handle the start button
    currentNote = getRandomNote()                                         // stores the getRandomNote function in the variable currentNote
    currentArp.push(currentNote);                                       // adds the currentNote to the currentArp array                                                    
    displayNoteElem.textContent = currentNote;                            // renders the currentNote onto the page through the displayNoteElem              
    console.log(`cpu played: ${currentNote}`)
    console.log(`current arpeggio: ${currentArp}`);

    
};

function handleWhiteKeys(event) {                                        // function to handle pressing the white keys
    if (event.target.classList.contains('white-key')) {                  // if the button pressed containst the classList "white-key"
        const note = event.target.getAttribute('data-note');             // store the attribute of 'data-note' in the variable 'note'
        displayNoteElem.textContent = note;                              // renders the note on the page   

        if (currentNote && note === currentNote) {                                        // if note played === the generated note
            console.log(`CORRECT! cpu played: ${currentNote}, you clicked: ${note}`);     // log correct!
            currentNote = getRandomNote();                                                // currentNote is a new note with getRandomNote()
            displayNoteElem.textContent = note;                                           // renders the new note                      
            console.log(`cpu played ${currentNote}`)                                      // logs the new note to play
            console.log(`current arpeggio: ${currentArp}`);                               // logs the current arpeggio        
        } else if (currentNote !== note) {                                                // else if, note played !== the generated note  
            console.log(`INCORRECT! cpu played: ${currentNote}, you clicked: ${note}`)    // log incorrect!  
        }
    }
};

function handleBlackKeys(event) {                                        // function to handle pressing the black keys
    if (event.target.classList.contains('black-key')) {                  // same logic as white keys  
        const note = event.target.getAttribute('data-note');
        displayNoteElem.textContent = note;
        if (currentNote && note === currentNote) {
            console.log(`CORRECT! cpu played: ${currentNote}, you clicked: ${note}`);
            currentNote = getRandomNote();
            displayNoteElem.textContent = note;
            console.log(`cpu played ${currentNote}`)
            console.log(`current arpeggio: ${currentArp}`);
        } else if (currentNote !== note) {
            console.log(`INCORRECT! cpu played: ${currentNote}, you clicked: ${note}`)
        }
    }
};




/*----------------------------- Event Listeners -----------------------------*/

startBtnElem.addEventListener('click', handleStartBtn);

whiteKeysElem.addEventListener('click', handleWhiteKeys);

blackKeysElem.addEventListener('click', handleBlackKeys);