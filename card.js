const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const RANKS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

class Card {
    constructor(suit, value, rank) {
        this.suit = suit;
        this.value = value;
        this.rank = rank;
    }
}

export default class Deck {
    constructor(cards = createDeck()) {
        this.cards = cards;
    }
}

function createDeck() {
    let newDeck = [];
    for (let i = 0; i < SUITS.length; i++) {
        for (let j = 0; j < VALUES.length; j++) {
            let newCard = new Card(SUITS[i], VALUES[j], RANKS[j]);
            newDeck.push(newCard);
        } 
    }

    let shuffledDeck = [];
    while (newDeck.length != 0) {
        let randomCard = newDeck[Math.floor(Math.random()*newDeck.length)];
        shuffledDeck.push(randomCard);
        let index = newDeck.findIndex(
            card => card.suit === randomCard.suit && card.value === randomCard.value
        );
        newDeck.splice(index, 1);
    }
    
    return shuffledDeck;
}