/*
 * Create a list that holds all of your cards
 */
const cards = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt',
    'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'
];

let openedCards = [];

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
    openedCards = [];
}

refreshButton[0].addEventListener('click', function () {
    console.log('refresh button was clicked');
    createShuffleCards(deck);
});

createShuffleCards(deck);

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
        console.log('card clicked');
        console.log('openedCards: ' + openedCards);

        if (event.target.className === 'card' && openedCards.length < 2) {
            event.target.className = 'card open show';
            
            const cardSymbol = event.target.firstChild.className;
            openedCards.push(cardSymbol);

            console.log('openedCards: ' + openedCards);
        } else if (openedCards.length == 2) {
            //TODO: verify selected cards
        }
    }
});