// set game variables
// Create a list that holds all of your cards
const container  = document.getElementById('deck');
let card         = document.getElementsByClassName("card"),
    cards        = [...card]
    // intialize opend cards
    openedCards  = [],
    // get array of match cards
    matchedCard  = document.getElementsByClassName("match"),
    matchCards   = [],
    // initialize the rating
    starsList    = document.querySelectorAll(".stars li"),
    stars        = document.querySelectorAll(".fa-star"),
    
    // initialize the number of click
    counter      = document.querySelector(".moves");
    
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex         = Math.floor(Math.random() * currentIndex);
        currentIndex       -= 1;
        temporaryValue      = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex]  = temporaryValue;
    }

    return array;
}
document.body.onload = intializeGame();
// start game function
function intializeGame() {
    // re-arrange the cards
    cards = shuffle(cards);
    // loop in cards array
    for (card in cards) {
        // empty the container from old cards
        container.innerHTML = '';
        // put new card in cards array
        [].forEach.call(cards, function(card) {
            // apend cards to the Dom
            container.appendChild(card);
        });
        // removing any class from the cards if it existing
        cards[card].classList.remove("show", "open", "match");
    }
    // reset moves
    let clickes      = 0;
    counter.innerHTML = clickes;
    // reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "hidden";
    }
        
}

// show card function
function showCard() {
    this.classList.toggle('open');
    this.classList.toggle('show');
    this.style.pointerEvents = 'none';
}
// add open card to array
function opencard() {
    openedCards.push(this);
    if (openedCards.length == 2) {
        if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
            openedCards[0].classList.add('match');
            openedCards[1].classList.add('match');
            openedCards[0].style.pointerEvents = 'none';
            openedCards[1].style.pointerEvents = 'none';
            matchCards.push(openedCards[0],openedCards[1]);
            openedCards = [];
        } else {
            
            openedCards[0].classList.remove('show', 'open');
            openedCards[1].classList.remove('show', 'open');
            openedCards = [];
        }
    }
}
// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", showCard);
    card.addEventListener("click", opencard);
};
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
