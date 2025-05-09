
/*-------------------------------- Constants --------------------------------*/
const blackNotes = ['C#', 'D#', 'F#', 'G#', 'A#'];
const whiteNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

// console.log(whiteNotes);
// console.log(blackNotes);


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
}


/*----------------------------- Event Listeners -----------------------------*/

startBtnElem.addEventListener('click', handleStartBtn);