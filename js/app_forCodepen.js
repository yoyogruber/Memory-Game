// The following code is broken into several section to increase readability
// Section 1: All variables that are needed
// Create a list that holds all of your cards
let card = document.getElementsByClassName("card");
let cards = [...card];

// amount of moves variable:
let moves = 0;
let counter = document.querySelector('.moves');

// DECK - This refers to the <ul> that holds all the <li>s with the class card
let deck = document.getElementById("card-deck");

// OPENED CARDS - An array to store the opened cards in
var openedCards = [];

let matchedCards = document.getElementsByClassName("match")

//2) Shuffle cards and start the game
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
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

// Run this when page is loaded
document.body.onload = startGame();

// startGame function that adds the icons to the html and resets things
function startGame() {
    // run the shuffle function
    cards = shuffle(cards);
    // remove all classes from all cards + shuffle classes that show items
    for (var i = 0; i < cards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    //reset moves
}


// Toggles open and show class to display cards
var displayCard = function() {
    if (!this.classList.contains('disabled') && !this.classList.contains('match')) {
        this.classList.toggle("open");
        this.classList.toggle("show");
        this.classList.toggle("disabled");
    }

};

function moveCounter() {
    moves++;
    counter.innerHTML = moves;
}

// 3) compare opened cards if they match

function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if (len === 2) {
        moveCounter();
        cards.forEach(function(item) {
            //add disabled so that no more than 2 cards can be clicked
            item.classList.add('disabled');
        });
        //compare
        if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
            matched();
        } else {
            unmatched();
        }
    }

}
// define matched and unmatched
// A) they match -> cards should be enabled
function matched() {
    openedCards[0].classList.add('match', 'disabled', 'animated', 'flash');
    openedCards[1].classList.add('match', 'disabled', 'animated', 'flash');
    openedCards[0].classList.remove('show', 'open');
    openedCards[1].classList.remove('show', 'open');
    openedCards = [];
    enable();
}

// B they do not match: 1) add a class that shows that they dont match 2) remove classes
function unmatched() {
    openedCards[0].classList.add("unmatched", 'animated', 'flipInY');
    openedCards[0].classList.add("unmatched", 'animated', 'flipInY');

    setTimeout(function() {
        openedCards[0].classList.remove("show", "open", "unmatched", "disabled");
        openedCards[1].classList.remove("show", "open", "unmatched", "disabled");
        openedCards = [];
        enable();
    }, 800);
}
//4. TO DO: keep the unmatched cards enabled for clicking

//function enable again unmatched
function enable() {
    cards.forEach(function(item) {
        if (!item.classList.contains('match')) {
            item.classList.remove('disabled');
        }
    });
}

// 5 moves time and star rating count
let first = document.querySelector('.first');
let second = document.querySelector('.second');

function moveCounter() {
    moves++;
    counter.innerHTML = moves;
    //Begin removing stars based on move count  
    if (moves > 13 && moves < 17) {
        first.style.visibility = 'hidden';
    } else if (moves > 17) {
        second.style.visibility = 'hidden';
    }
}
// Start timer on first click on card
var duration = document.querySelector('.duration');
let seconds = 0;
if (moves == 1) {
    var timer = setInterval(timerfunction, 1000);
    console.log("duration should start" , seconds);
}

function timerfunction() {
    seconds++;
    console.log(seconds);
    duration.innerHTML = seconds;
}

// Start timer with reload 
let startTimer = setInterval(timer, 1000);
//Timer Function
function timer() {
    seconds++;
    document.querySelector("#timer").innerHTML = seconds;
}

//jquery how to implement restart -- reload the whole thing
$(document).ready(function() {
    //TODO: Reset page.
    $('.restart').click(function() {
        location.reload();
    });
});

//function finished:  matched == 16 show modal
//6. TO DO - Show a congratulations modal when the player finished the game - show the players time, moves and star rating
// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function finished() {
    if (matchedCards.length == 16) {
        clearInterval(timer);
        //make modal visible
        modal.style.display = "block";
        addMessage();
    }
}

function addMessage() {
    clearInterval(startTimer);
    var howManyStars = document.querySelector(".stars").innerHTML;
    var message = document.getElementById('message');
    //console.log(howManyStars);
    message.innerHTML = `You finished the game in ${seconds} seconds.<br>
     You made ${moves} moves.<br>
     You have ${howManyStars} stars.`;
    var howManyStars2 = howManyStars.length();
    message.innerHTML = `You finished the game in ${seconds} seconds.<br> You have ${howManyStars2} <br> stars.`;
}

// set up of an event listener for each card
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", finished);
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