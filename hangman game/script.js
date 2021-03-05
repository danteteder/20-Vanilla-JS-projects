const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

//Take all parts
const figureParts = document.querySelectorAll('.figure-part');
// can update this to an API request that takes random words from a server
const words = ['application', 'programming', 'interface', 'wizard'];

//randomly generated word form array
let selectedWord = words[Math.floor(Math.random() * words.length)];

//we need 2 arrays, 1 to store crorect letters, other for wrong
const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(letter => `
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>`
        )
        //join it back into a string
        .join('')} 
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if(innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations!';
        popup.style.display = 'flex';
    }
}

// Update the wrong letters
function updateWronglettersEl() {
    

    // Displays wrong letters
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    // Displays figure stick parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    })

    // Check if lost
    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you lost!';
        popup.style.display = 'flex';
    }
}

// Show notification
function showNotification(){
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Keydown letter press function
window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWronglettersEl();
            } else {
                showNotification();
            }
        }
    }
});

// Restarts game when PLAY AGAIN is clicked
playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();

    updateWronglettersEl();

    popup.style.display = 'none';
})

displayWord();