import Deck from "./card.js";

const deck = new Deck();

function flipTopCard() {
    return deck.cards[0];
}

function removeTopCard() {
     deck.cards.shift();
}

let playersFirstCard = flipTopCard();
removeTopCard();
let dealersFirstCard = flipTopCard();
removeTopCard();
let playersSecondCard = flipTopCard();
removeTopCard();
let dealersSecondCard = flipTopCard();
removeTopCard();

let playersTotal = 0;
let dealersTotal = 0;
let ace_increase_player = false;
let ace_increase_dealer = false;
let cards_player_flipped = 2;
let cards_dealer_flipped = 1;
let playersFirstCardElement = document.getElementsByClassName("player-card-1")[0];
let dealersFirstCardElement = document.getElementsByClassName("dealer-card-1")[0];
let playersSecondCardElement = document.getElementsByClassName("player-card-2")[0];
let dealersSecondCardElement = document.getElementsByClassName("dealer-card-2")[0];
let statusElement = document.getElementById("status");
let hitButton = document.getElementById("hit");
let stayButton = document.getElementById("stay");
let tryAgainButton = document.getElementById("try-again");
playersTotal = playersFirstCard.rank + playersSecondCard.rank;
tryAgainButton.style.visibility = "hidden";
if ((playersFirstCard.value.localeCompare("A") == 0) || (playersSecondCard.value.localeCompare("A") == 0)) {
    playersTotal += 10;
    ace_increase_player = true;
}

if (playersTotal != 21) {
    statusElement.innerHTML = "You have " + playersTotal + ". Do you want to hit or stay?";
} else {
    statusElement.innerHTML = "Congratulations! You win! Try again?";
    hitButton.style.visibility = "hidden";
    stayButton.style.visibility = "hidden";
    tryAgainButton.style.visibility = "visible";
}
playersFirstCardElement.innerHTML = playersFirstCard.value + playersFirstCard.suit;
dealersFirstCardElement.innerHTML = dealersFirstCard.value + dealersFirstCard.suit;
playersSecondCardElement.innerHTML = playersSecondCard.value + playersSecondCard.suit;

if ((playersFirstCard.suit.localeCompare("♥") == 0) || (playersFirstCard.suit.localeCompare("♦") == 0)) {
    playersFirstCardElement.style.color = '#d00';
}

if ((dealersFirstCard.suit.localeCompare("♥") == 0) || (dealersFirstCard.suit.localeCompare("♦") == 0)) {
    dealersFirstCardElement.style.color = '#d00';
}

if ((playersSecondCard.suit.localeCompare("♥") == 0) || (playersSecondCard.suit.localeCompare("♦") == 0)) {
    playersSecondCardElement.style.color = '#d00';
}

hitButton.onclick = function(){
    cards_player_flipped ++;
    let playersNextCard = flipTopCard();
    removeTopCard();
    // listOfCardValuesPlayerHas.push(playersNextCard.value);
    let playersNextCardElement = document.getElementsByClassName("player-card-" + cards_player_flipped)[0];
    playersNextCardElement.style.height = "180px";
    playersNextCardElement.style.width = "120px";
    playersNextCardElement.style.border = "solid";
    playersNextCardElement.style.borderRadius = "10px";
    playersNextCardElement.style.fontSize = "40px";
    playersNextCardElement.innerHTML = playersNextCard.value + playersNextCard.suit;
    playersTotal += playersNextCard.rank;
    if (!ace_increase_player && (playersNextCard.value.localeCompare("A") == 0)) {
        if ((playersTotal + 10) <= 21) {
            playersTotal += 10;
            ace_increase_player = true;
        }
    }

    if ((playersNextCard.suit.localeCompare("♥") == 0) || (playersNextCard.suit.localeCompare("♦") == 0)) {
        playersNextCardElement.style.color = '#d00';
    }

    if (playersTotal > 21) {
        if (ace_increase_player) {
            playersTotal -= 10;
            ace_increase_player = false;
        }
    }

    if (playersTotal > 21) {
        statusElement.innerHTML = "Bust. Sorry, you lose. Want to try again?";
        hitButton.style.visibility = "hidden";
        stayButton.style.visibility = "hidden";    
        tryAgainButton.style.visibility = "visible";
    } else if (playersTotal < 21) {
        statusElement.innerHTML = "You have " + playersTotal + ". Do you want to hit or stay?";
    } else {
        statusElement.innerHTML = "Congratulations! You win! Try again?";
        hitButton.style.visibility = "hidden";
        stayButton.style.visibility = "hidden";    
        tryAgainButton.style.visibility = "visible";
    }
};

stayButton.onclick = function(){nextCard()}

function nextCard() {
    hitButton.style.visibility = "hidden";
    stayButton.style.visibility = "hidden";    
    if (cards_dealer_flipped == 1) {
        cards_dealer_flipped ++;
        dealersSecondCardElement.style.backgroundColor = "white";
        dealersSecondCardElement.style.height = "180px";
        dealersSecondCardElement.style.width = "120px";
        dealersSecondCardElement.style.border = "solid";
        dealersSecondCardElement.style.borderRadius = "10px";
        dealersSecondCardElement.style.fontSize = "40px";
        dealersSecondCardElement.innerHTML = dealersSecondCard.value + dealersSecondCard.suit;
        dealersTotal = dealersFirstCard.rank + dealersSecondCard.rank;
        if ((dealersSecondCard.suit.localeCompare("♥") == 0) || (dealersSecondCard.suit.localeCompare("♦") == 0)) {
            dealersSecondCardElement.style.color = '#d00';
        }
        if ((dealersFirstCard.value.localeCompare("A") == 0) || (dealersSecondCard.value.localeCompare("A") == 0)) {
            dealersTotal += 10;
            ace_increase_dealer = true;
        }
    } else {
        cards_dealer_flipped ++;
        let dealersNextCard = flipTopCard();
        removeTopCard();
        let dealersNextCardElement = document.getElementsByClassName("dealer-card-" + cards_dealer_flipped)[0];
        dealersNextCardElement.style.height = "180px";
        dealersNextCardElement.style.width = "120px";
        dealersNextCardElement.style.border = "solid";
        dealersNextCardElement.style.borderRadius = "10px";
        dealersNextCardElement.style.fontSize = "40px";
        dealersNextCardElement.innerHTML = dealersNextCard.value + dealersNextCard.suit;
        dealersTotal += dealersNextCard.rank;
        if ((dealersNextCard.suit.localeCompare("♥") == 0) || (dealersNextCard.suit.localeCompare("♦") == 0)) {
            dealersNextCardElement.style.color = '#d00';
        }
        if (!ace_increase_dealer && (dealersNextCard.value.localeCompare("A") == 0)) {
            if ((dealersTotal + 10) <= 21) {
                dealersTotal += 10;
                ace_increase_dealer = true;
            }
        }
    }

    if (dealersTotal > 21) {
        if (ace_increase_dealer) {
            dealersTotal -= 10;
            ace_increase_dealer = false;
        }
    }

    if (dealersTotal >= 17 && dealersTotal < 21) {
        if (dealersTotal > playersTotal) {
            statusElement.innerHTML = "Dealer has " + dealersTotal + " and you have " + playersTotal + ". Sorry, you lose. Try again?";
        } else if (dealersTotal < playersTotal) {
            statusElement.innerHTML = "Dealer has " + dealersTotal + " and you have " + playersTotal + ". Congratulations, you win! Try again?";
        } else {
            statusElement.innerHTML = "Dealer has " + dealersTotal + " and you have " + playersTotal + ". It's a tie. Try again?";
        }
        tryAgainButton.style.visibility = "visible";
    } else if (dealersTotal > 21) {
        statusElement.innerHTML = "Dealer busted. Congratulations, you win! Try again?";
        tryAgainButton.style.visibility = "visible";
    } else if (dealersTotal == 21) {
        statusElement.innerHTML = "Dealer has " + dealersTotal + " and you have " + playersTotal + ". Sorry, you lose. Try again?";
        tryAgainButton.style.visibility = "visible";
    } else {
        nextCard();
    }
}