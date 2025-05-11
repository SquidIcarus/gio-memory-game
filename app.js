
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
    const randomNote = getRandomNote();                                  // stores the getRandomNote function in the variable randomNote                       
    displayNoteElem.textContent = randomNote;                            // renders the randomNote onto the page through the displayNoteElem              
    console.log(`computer played: ${randomNote}`)
};

function handleWhiteKeys(event) {                                        // function to handle pressing the white keys
    if (event.target.classList.contains('white-key')) {                  // if the button pressed containst the classList "white-key"
        const note = event.target.getAttribute('data-note');             // store the attribute of 'data-note' in the variable 'note'
        console.log(note); // test
        displayNoteElem.textContent = note;                              // renders the note on the page   
    }
};

function handleBlackKeys(event) {                                        // function to handle pressing the black keys
    if (event.target.classList.contains('black-key')) {                  // same logic as white keys  
        const note = event.target.getAttribute('data-note');             
        console.log(note); // test
        displayNoteElem.textContent = note;                                 
    }
}


/*----------------------------- Event Listeners -----------------------------*/

startBtnElem.addEventListener('click', handleStartBtn);

whiteKeysElem.addEventListener('click', handleWhiteKeys);

blackKeysElem.addEventListener('click', handleBlackKeys);