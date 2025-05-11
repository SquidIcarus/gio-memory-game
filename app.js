
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

function handleStartBtn(event) {
    console.log(event);
};

function handleWhiteKeys(event) {
    console.log(event);
};

function handleBlackKeys(event) {
    console.log(event);
}


/*----------------------------- Event Listeners -----------------------------*/

startBtnElem.addEventListener('click', handleStartBtn);

whiteKeysElem.addEventListener('click', handleWhiteKeys);

blackKeysElem.addEventListener('click', handleBlackKeys);