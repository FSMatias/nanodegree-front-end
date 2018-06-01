/*
 * Create a list that holds all of your cards
 */
const cards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',
    'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'
];

let openedCards;
let movesCounter;
let numberOfCardPairsMatched;

const cardOpenShowClass = 'card open show';
const matchedCardsClass = 'card match';
const matchingCardsClass = 'card show matching';
const diffCardsClass = 'card show diff';
const cardClass = 'card';

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const refreshButton = document.getElementsByClassName('restart');
const deck = document.getElementById('cards-deck');

//TODO: improve performance!
function createShuffleCards(parentElement) {
    const array = shuffle(cards.concat(cards));
    console.log('new array:' + array);

    const existingCards = parentElement.querySelectorAll('li');
    if (existingCards.length > 0) {
        for (index = 0; index < existingCards.length; index++) {
            (parentElement.querySelector('li')).remove();
        }
    }

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
    console.log('refresh button was clicked');
    restartGame();
});

function restartGame() {
    createShuffleCards(deck);
    openedCards = [];
    movesCounter = 0;
    numberOfCardPairsMatched = 0;
    updateMovesElementValue(movesCounter);
}

restartGame();

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
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

deck.addEventListener('click', function (event) {
    if (event.target.nodeName === 'LI') {
        if (event.target.className === cardClass && openedCards.length < 2) {
            event.target.className = cardOpenShowClass;
            const cardSymbol = event.target.firstChild.className;
            openedCards.push(cardSymbol);
            if (openedCards.length === 2) {
                incrementMovesCounter();
                checkCardsAreTheSame(openedCards);
            }
        }
    }
});

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

function updateMovesElementValue(value) {
    const movesElements = document.getElementsByClassName('moves');
    movesElements[0].innerHTML = value;
}

const modalDiv = document.getElementsByClassName('modal');

function checkAllCardsHaveMatched() {
    if (numberOfCardPairsMatched === cards.length) {
        const modelContentP = document.getElementById("model-content-p");
        modelContentP.textContent = "With " + movesCounter + " Moves and xx Stars."
        modalDiv[0].style.display = "block";
    }
}

const newGameButton = document.getElementById('newGameButton');

newGameButton.addEventListener('click', function () {
    restartGame();
    modalDiv[0].style.display = "none";
});