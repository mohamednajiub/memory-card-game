// @description set game variables
// @description Create a list that holds all of your cards
const container  = document.getElementById('deck'),
    // @description get restart button from the html
    restart    = document.querySelector('.restart'),
    // @description close button in modal
    closeModal = document.querySelector('.fa-close'),
    // @description play again button in modal
    playAgain  = document.getElementById('playAgain');
let timeCount,
    card         = document.getElementsByClassName("card"),
    cards        = [...card],
    // intialize opend cards
    openedCards  = [],
    // get array of match cards
    matchedCard  = document.getElementsByClassName("match"),
    matchCards   = [],

    // initialize the rating
    starsList    = document.querySelectorAll(".stars li"),
    stars        = document.querySelectorAll(".fa-star"),
    
    // initialize the number of click
    counter      = document.querySelector(".moves"),
    
    // intialize the timer
    timer        = document.querySelector(".timer");

// @description Shuffle function from http://stackoverflow.com/a/2450976
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
    // reset first click
    firstClick = true;
    // empety open cards array
    openedCards = [];
    // empety match cards array
    matchCards = [];
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
        cards[card].classList.remove("show", "open", "match");
    }
    // Resets number of moves
    moves             = 0;
    counter.innerHTML = moves;
    // Reset Raiting
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    };
    // Reset timer
    stopTimer();
    ResetTime();
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
    openedCards[0].style.pointerEvents = 'none';
    openedCards[1].style.pointerEvents = 'none';
    matchCards.push(openedCards[0],openedCards[1]);
    openedCards = [];
    isOver();
    
}
function isOver() {
    if (matchCards.length === 16) {
        stopTimer();
        modal();
    }
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

// @description  disable clicking on all cards function
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.style.pointerEvents = 'none';
    });
};
// @description enable clicking on un matced cards function
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.style.pointerEvents = 'auto';
    });
};
// @description click counter function
function clickCounter(){
    moves++;
    counter.innerHTML = moves;
    // setting rates based on moves
    if (moves > 16 && moves <= 20){
        for(star in stars){
            if(star > 1){
                stars[star].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 16){
        for(star in stars){
            if(star > 0){
                stars[star].style.visibility = "collapse";
            }
        }
    }
}

/* @description set timer functionality
* time counter function
*/
function startTimer(){
    timeCount = setInterval(()=> {
        sec++;
        if (sec < 10){
            sec = "0"+ sec;
        }
        if (sec == 60) {
            min ++;
            sec = 0;
            if (min < 10){
                min = "0"+ min;
            }
        } 
        if (min == 60){
            hours ++;
            min = 0;
            if (hours < 10){
                hours = "0"+ hours;
            }
        }
        timer.innerHTML = hours + ":" + min + ":" + sec;
    },1000);
}
// @description Reset Timer function
function ResetTime() {
    sec   = 0;
    min   = 0;
    hours = 0;
    if (sec < 10){
        sec = "0"+ sec;
    }
    if (min < 10){
        min = "0"+ min;
    }
    if (hours < 10){
        hours = "0"+ hours;
    }
}
// @description stop timer function
function stopTimer() {
    clearInterval(timeCount);
}



/*
* @description modal functionality  
* get modal variables and functions
*/
const modalContainer = document.querySelector('.modal');
let totalTime        = document.querySelector('.totalTime'),
    totalMoves       = document.querySelector('.totalMoves'),
    finalRaiting     = document.querySelector('.finalRaiting');

// @description display modal function
function modal() {
    modalContainer.style.display = "grid";
    totalTime.innerHTML = timer.innerHTML;
    totalMoves.innerHTML = counter.innerHTML;
    finalRaiting.innerHTML = document.querySelector(".stars").innerHTML;
    closeModal.addEventListener('click', close);
}

// @description add functionality to play again button
playAgain.addEventListener('click',()=>{
    intializeGame();
    close();
});

// @description close modal fuunction
function close() {
    modalContainer.style.display = "none";
}

// loop to add event listeners to each card
for (let i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener('click',()=>{
        if (firstClick){
            startTimer();
            firstClick = false;
        }
    });
    card.addEventListener("click", showCard);
    card.addEventListener("click", opencard);    
};