
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

const maxHighScores = 5;                 // amount of scores to keep
const highScoresKey = 'gioHighScores';   // key for localStorage

/*-------------------------------- Variables --------------------------------*/

let currentNote = null;
let cpuArp = [];
let playerArp = [];
// let computerSpeed = 500; // holding for future speed option
let highScores = [];        // array for holding high scores

/*------------------------ Cached Element References ------------------------*/

const startBtnElem = document.getElementById('start-btn');
const arpLengthElem = document.querySelector('.sequence-count');
const msgElem = document.getElementById('message');
const keysElem = document.querySelectorAll('.white-key, .black-key');
const displayNoteElem = document.getElementById('display-note');
const splashScreen = document.getElementById('splash-screen');
const startGameBtn = document.getElementById('lets-go');
const highScoresListElem = document.getElementById('high-scores-list');

console.log(localStorage);
console.dir(highScoresListElem);


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
    startBtnElem.textContent = 'Meow!';
    arpLengthElem.textContent = `Arpeggio Length: `;
    displayMessage(`Let's go!`);
    currentNote = null;
    cpuArp = [];
    playerArp = [];
    currentNote = getRandomNote();
    cpuArp.push(currentNote);
    displayNoteElem.textContent = currentNote;
    keyLight(currentNote);
    playNote(currentNote);
    setTimeout(() => {
        displayNoteElem.textContent = '';
        keyLightOff(currentNote);
    }, 500);
};

function playCpuSequence(sequence, callback) {
    let index = 0;
    function playNextNote() {
        if (index < sequence.length) {
            const note = sequence[index];
            displayNoteElem.textContent = note;
            keyLight(note);
            playNote(note);
            setTimeout(() => {
                keyLightOff(note);
                displayNoteElem.textContent = '';
                index++;
                setTimeout(playNextNote, 300);
            }, 500);
        } else if (callback) {
            callback();
        }
    }
    setTimeout(playNextNote, 500);
    console.log(cpuArp);
};

function handleCorrectNote() {
    arpLengthElem.textContent = `Arpeggio Length: ${cpuArp.length}`;
    if (cpuArp.length === 1) {
        displayMessage('Good Luck!')
    }
    if (cpuArp.length === 3) {
        displayMessage('Keep it up!🐾')
    }
    if (cpuArp.length === 5) {
        displayMessage('Mewow! Look at you go!🐱‍🏍')
    }
    if (cpuArp.length === 9) {
        displayMessage(`Ameowzing! You're a memory arpeggiator master! How much further can you go?`)
    }
    currentNote = getRandomNote();
    cpuArp.push(currentNote);
    playCpuSequence(cpuArp, () => {
        playerArp = [];
    })
};


function handleKeys(event) {

    if (cpuArp.length === 0) return;

    if (event.target.classList.contains('white-key') || event.target.classList.contains('black-key')) {
        const note = event.target.getAttribute('data-note');
        playerArp.push(note);
        displayNoteElem.textContent = note;
        keyLight(note);
        playNote(note);
        setTimeout(() => {
            displayNoteElem.textContent = '';
            keyLightOff(note);
        }, 500);


        if (note !== cpuArp[playerArp.length - 1]) {
            playerArp = [];
            startBtnElem.textContent = 'Go!';
            arpLengthElem.textContent = `${cpuArp.length} note arpeggio, wow!`;
            displayMessage(`Game over 😿`);
            const score = cpuArp.length - 1;
            if (score > 0) checkHighScore(score);
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
};

function loadHighScores() {                                 //loads saved scores
    const saved = localStorage.getItem(highScoresKey);
    highScores = saved ? JSON.parse(saved) : [];
    renderHighScores();
};

function renderHighScores() {
    const highScoresListElem = document.getElementById('high-scores-list');
    highScoresListElem.innerHTML = '';
    if (highScores.length === 0) {
        highScoresListElem.innerHTML = '<li>No scores yet!</li>';
        return;
    }
    
    highScores.forEach((score, index) => {
        const li = document.createElement('li');
        li.textContent = `${score.name}: ${score.score} notes`;
        highScoresListElem.appendChild(li);
    });
};


function checkHighScore(score) {
    if (highScores.length < maxHighScores || score > highScores[highScores.length-1]?.scores) {
        const name = prompt(`New high score! (${score} notes)\nEnter your name:`) || `Anonyous`;
        saveHighScore(name, score);
    }
};

function saveHighScore(name, score) {
    highScores.push({ name, score });
    highScores.sort((a,b) => b.score - a.score);
    highScores = highScores.slice(0, maxHighScores);
    localStorage.setItem(highScoresKey, JSON.stringify(highScores));
    renderHighScores();
}


/*----------------------------- Event Listeners -----------------------------*/

startBtnElem.addEventListener('click', handleStartBtn);

keysElem.forEach(key => {
    key.addEventListener('click', handleKeys);
});

startGameBtn.addEventListener('click', () => {
    splashScreen.style.display = 'none';
    document.querySelector('main').classList.add('show-game');
    document.querySelector('footer').classList.add('show-game');
});

loadHighScores();