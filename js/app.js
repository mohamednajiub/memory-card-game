// set game variables
// Create a list that holds all of your cards
const container  = document.getElementById('deck');
let timeCount,
    card         = document.getElementsByClassName("card"),
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
    moves        = 0,
    counter      = document.querySelector(".moves"),
    
    // intialize the timer
    hours        = 0,
    min          = 0,
    sec          = 0,
    timer        = document.querySelector(".timer"),
    
    // first click 
    firstClick = true;
    
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

// Reset the game on load page
document.body.onload = intializeGame();

// initializing game function
function intializeGame() {

    // re-arrange the cards
    cards = shuffle(cards);

    // loop in cards array and put new cards in the array
    for (card in cards) {
        // empty the container from old cards
        container.innerHTML = '';
        // put new card in cards array
        [].forEach.call(cards, function(card) {
            // apend cards to the Dom
            container.appendChild(card);
        });
    }

    // Resets number of moves
    counter.innerHTML = moves;

    // Reset Raiting
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "hidden";
    }

    // Reset timer
    if (sec < 10){
        sec = "0"+ sec
    }
    if (min < 10){
        min = "0"+ min
    }
    if (hours < 10){
        hours = "0"+ hours
    }
    // display timer
    timer.innerHTML = hours + ":" + min + ":" + sec ;
    
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
    if (openedCards.length === 2) {
        // move function will be written here
        clickCounter();
        // check if the 2 cards open are matched or not
        if (openedCards[0].innerHTML == openedCards[1].innerHTML) {
            // matches the cards
            matchCard();
        } else {
            // unmatch cards
            unmatchCards();
        }
    }
}
// matching cards
function matchCard() {
    openedCards[0].classList.add('match');
    openedCards[1].classList.add('match');
    openedCards[0].classList.remove('open','show');
    openedCards[1].classList.remove('open','show');
    openedCards[1].style.pointerEvents = 'none';
    openedCards[0].style.pointerEvents = 'none';
    matchCards.push(openedCards[0],openedCards[1]);
    if (matchCards.length == 16){
        stopTimer();
        modal();
    }
    openedCards = [];
    
}
// unmatch cards functions
function unmatchCards() {
    // disable clicking on all cards
    disable();
    setTimeout(() => {
        openedCards[0].classList.remove('open','show');
        openedCards[1].classList.remove('open','show');
        openedCards[0].style.pointerEvents = 'auto';
        openedCards[1].style.pointerEvents = 'auto';
        // empty the open card
        openedCards = [];
        // enable clicking on all except matched cards
        enable();
    }, 500);
}

// disable clicking on all cards function
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.style.pointerEvents = 'none';
    });
};
// enable clicking on un matced cards function
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.style.pointerEvents = 'auto';
    });
};
// click counter function
function clickCounter(){
    moves++;
    counter.innerHTML = moves;
}

// time counter function
function startTimer(){
    timeCount = setInterval(()=>{
        sec++;
        if (sec < 10){
            sec = "0"+ sec
        }
        if (sec == 60) {
            min ++;
            sec = 0;
            if (min < 10){
                min = "0"+ min
            }
        } 
        if (min == 60){
            hours ++;
            min = 0;
            if (hours < 10){
                hours = "0"+ hours
            }
        }
        timer.innerHTML = hours + ":" + min + ":" + sec ;
        
    },1000);
}

// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener('click',()=>{
        if (firstClick){
            startTimer();
            firstClick = false;
        }
    })
    card.addEventListener("click", showCard);
    card.addEventListener("click", opencard);
    
};

// stop timer function
function stopTimer() {
    // Stop Timer
    clearInterval(timeCount);
}


// get modal variables and functions
const modalContainer = document.querySelector('.modal');
let totalTime        = document.querySelector('.totalTime'),
    totalMoves       = document.querySelector('.totalMoves'),
    finalRaiting     = document.querySelector('.finalRaiting');
function modal() {
    modalContainer.style.display = "grid";
    totalTime.innerHTML = timer.innerHTML;
    totalMoves.innerHTML = counter.innerHTML;
    finalRaiting
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
