// The following code is broken into several section to increase readability

// Section 1: All variables that are needed
// Create a list that holds all of your cards
let card = document.getElementsByClassName("card");
let cards = [...card];
//console.log(card);
// amount of moves variable:
let moves = 0;
let counter = document.querySelector('.moves');
// DECK - This refers to the <ul> that holds all the <li>s with the class card
let deck = document.getElementById("card-deck");

// OPENED CARDS - An array to store the opened cards in
    var openedCards = [];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
//2) Shuffle cards and start the game
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Run this when page si loaded
document.body.onload = startGame();

// startGame function that adds the icons to the html and resets stuff
function startGame(){
// run the shuffle function
cards=shuffle(cards);
// remove all classes from all cards + shuffle classes that show items
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
            [].forEach.call(cards, function(item) {
            deck.appendChild(item);
            });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
//reset moves


}


    // Toggles open and show class to display cards
    var displayCard = function (){
    	if (!this.classList.contains('disabled') && !this.classList.contains('match')) {
    		this.classList.toggle("open");
    		this.classList.toggle("show");
    		this.classList.toggle("disabled");
         }

};

 function moveCounter () {
       	moves++;
       	counter.innerHTML = moves;
       	//console.log(moves);
		//console.log(counter);
       }

// 3 compare opened cards if they match

function cardOpen(){
openedCards.push(this);
var len = openedCards.length;
if (len === 2) {
	moveCounter();
	//compare
	//console.log (openedCards[0].type);
	console.log(openedCards[0].innerHTML, openedCards[1].innerHTML);

	if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
		matched();
		} else {
			unmatched();
		}
	}

} 
// define matched and unmatched
// A) they match
function matched() {
    openedCards[0].classList.add('match', 'disabled');
    openedCards[1].classList.add('match', 'disabled');
    openedCards[0].classList.remove('show', 'open');
    openedCards[1].classList.remove('show', 'open');
    openedCards = [];
}

// B they do not match: 1) add a class that shows that they dont match 2) remove classes
function unmatched() {
	openedCards[0].classList.add("unmatched");
	openedCards[0].classList.add("unmatched");
	//Array.prototype.filter.call(cards, function(card){
    //    card.classList.add('disabled');
    //});

	setTimeout(function(){
		openedCards[0].classList.remove("show", "open", "unmatched", "disabled");
		openedCards[1].classList.remove("show", "open", "unmatched", "disabled");
		openedCards = [];
		},800);
}





  // set up of an event listener for each card
    for (var i = 0; i < cards.length; i++){
        card = cards[i];
        card.addEventListener("click", displayCard);
        card.addEventListener("click", cardOpen);
      //  card.addEventListener("click",congratulations);
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
