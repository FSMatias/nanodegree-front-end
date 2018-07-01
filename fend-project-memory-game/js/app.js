/*
 * List of all cards
 */
const cards = ['fa-sun', 'fa-paper-plane', 'fa-anchor', 'fa-bolt',
    'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'
];

let openedCards;
let movesCounter;
let numberOfCardPairsMatched;
let starRate;
let gameTimer;
let timer;
let firstCardClicked;

const cardOpenShowClass = 'card open show';
const matchedCardsClass = 'card match';
const matchingCardsClass = 'card show matching';
const diffCardsClass = 'card show diff';
const cardClass = 'card';
const regularStarClass = 'far fa-star';
const boldStarClass = 'fa fa-star';
const redoClass = 'fa fa-redo';

const refreshButton = document.getElementsByClassName('restart');
const deck = document.getElementById('cards-deck');
const starsList = document.getElementsByClassName('fa-star');
const timerValue = document.getElementById('timer-value');

function createShuffleCards(parentElement) {
    const array = shuffle(cards.concat(cards));

    const existingCards = parentElement.querySelectorAll('li');
    if (existingCards.length > 0) {
        let index = 0;
        existingCards.forEach(element => {
            element.className = cardClass;
            element.querySelector('i').className = 'fa ' + array[index];
            index++;
        });
    } else {
        createCards(array, parentElement);
    }
}

/*
 *  Create shuffled cards on board with 'closed' state
 */
function createCards(array, parentElement) {
    array.forEach(element => {
        const li = document.createElement('li');
        li.className = 'card';

        const i = document.createElement('i');
        i.className = 'fa ' + element;
        li.appendChild(i);
        parentElement.appendChild(li);
    });
}

refreshButton[0].addEventListener('click', function () {
    const restartIcon = document.getElementById('restart-icon');
    restartIcon.className = redoClass + " restart-animated";
    setTimeout(function () {
        restartIcon.className = redoClass;
    }, 500);
    stopTimer();
    restartGame();
});

/*
 *  At the moment the game restarts,
 *      1. The cards should be shufled and display in the 'closed' state
 *      2. The moves counter, the star rating, the number of cards matched and the timer should be reset
 */
function restartGame() {
    firstCardClicked = false;
    createShuffleCards(deck);
    openedCards = [];
    movesCounter = 0;
    numberOfCardPairsMatched = 0;
    resetStarRating();
    updateMovesElementValue(movesCounter);
    gameTimer = 0;
    updateTimerValue();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 *  When a user clicks a card, the card should display to the user.
 *  If there is already another card opened:
 *      1. The number of moves should increase by one
 *      2. the updateStarRating function should be called to verify/update the star rating
 *      3. The checkCardsAreTheSame function should be called to check if both opened cards match
 */
deck.addEventListener('click', function (event) {
    if (!firstCardClicked) {
        startTimer();
        firstCardClicked = true;
    }
    if (event.target.nodeName === 'LI') {
        if (event.target.className === cardClass && openedCards.length < 2) {
            event.target.className = cardOpenShowClass;
            const cardSymbol = event.target.querySelector('i').className;
            openedCards.push(cardSymbol);
            if (openedCards.length === 2) {
                incrementMovesCounter();
                updateStarRating();
                checkCardsAreTheSame(openedCards);
            }
        }
    }
});

/*
 *  checkCardsAreTheSame function 
 *    If cards are the same, the following task should be completed:
 *      1. The cards that match whould keep opened      
 *      2. numberOfCardPairsMatched variable should increase by one
 *      3. it should check if all cards have already being matched
 *    If cards don't match, the cards should move back to 'closed' state
 */
function checkCardsAreTheSame(cardsArray) {
    if (cardsArray.length !== 2) {
        return;
    }

    let openedCardsElement = deck.getElementsByClassName(cardOpenShowClass);
    const card1 = openedCardsElement[0];
    const card2 = openedCardsElement[1];

    if (cardsArray[0] === cardsArray[1]) {
        card1.className = matchingCardsClass;
        card2.className = matchingCardsClass;
        setTimeout(function () {
            card1.className = matchedCardsClass;
            card2.className = matchedCardsClass;

        }, 500);
        numberOfCardPairsMatched++;
        checkAllCardsHaveMatched();
    } else {
        card1.className = diffCardsClass;
        card2.className = diffCardsClass;
        setTimeout(function () {
            card1.className = cardClass;
            card2.className = cardClass;

        }, 700);
    }
    openedCards = [];
}

function incrementMovesCounter() {
    movesCounter++;
    updateMovesElementValue(movesCounter);
}

function updateStarRating() {
    switch (movesCounter) {
        case 7:
            starsList[2].className = regularStarClass;
            starRate = 2;
            break;
        case 14:
            starsList[1].className = regularStarClass;
            starRate = 1;
            break;
    }
}

function resetStarRating() {
    starsList[2].className = boldStarClass;
    starsList[1].className = boldStarClass;
    starRate = 3;
}

function updateMovesElementValue(value) {
    const movesElements = document.getElementsByClassName('moves');
    movesElements[0].innerHTML = value;
}

function updateTimerValue() {
    timerValue.innerHTML = calculateTimerValueInMinAndSec();
}

function calculateTimerValueInMinAndSec() {
    var minutes = Math.floor(gameTimer / 60);
    var seconds = gameTimer % 60;
    return minutes + "min " + seconds + "s"
}

const modalDiv = document.getElementsByClassName('modal');

/*
 *  When all cards have matched, timer should stop and a model should be displayed with a Congrats message
 *  informing the user his star rating, moves count and timer value 
 */
function checkAllCardsHaveMatched() {
    if (numberOfCardPairsMatched === cards.length) {
        stopTimer();
        const modelContentP = document.getElementById("model-content-p");
        modelContentP.textContent = "With " + movesCounter + " Moves and " + starRate + " Stars. You finished the game in " + calculateTimerValueInMinAndSec(gameTimer);
        modalDiv[0].style.display = "block";
    }
}

const newGameButton = document.getElementById('newGameButton');

newGameButton.addEventListener('click', function () {
    restartGame();
    modalDiv[0].style.display = "none";
});

/* 
 * -- Timer -- 
 * Update timer every second
 */
function startTimer() {
    timer = setInterval(function timer() {
        gameTimer++;
        updateTimerValue();
    }, 1000);
}

function stopTimer() {
    if (timer != undefined) {
        clearInterval(timer);
    }
}

restartGame();