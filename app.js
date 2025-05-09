
/*-------------------------------- Constants --------------------------------*/
const pianoNotes = [
    { note: 'C', type: 'white' },
    { note: 'C#', type: 'black' },
    { note: 'D', type: 'white' },
    { note: 'D#', type: 'black' },
    { note: 'E', type: 'white' },
    { note: 'E#', type: 'black' },
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
const blackNotesElem = document.getElementById('black-keys');
const whiteNotesElem = document.getElementById('white-keys');
const displayNoteElem = document.getElementById('display-note');

// console.log();

/*-------------------------------- Functions --------------------------------*/

function handleStartBtn(event) {
    console.log(event);
};

function pianoSequencer() {
    pianoNotes.forEach(noteObj => {
        
    })
}



        /*----------------------------- Event Listeners -----------------------------*/

        startBtnElem.addEventListener('click', handleStartBtn);