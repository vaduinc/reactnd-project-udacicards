import {getDecks,saveDeckTitle,addCardToDeck} from '../utils/api'
import * as TYPES from './actionTypes'

export const fetchDecks = () => dispatch => (
    getDecks()
        .then(decks => dispatch(receiveDecks(decks)))
)

export const receiveDecks = (decks) => {
    return {
        type: TYPES.RECEIVE_DECKS,
        decks
    } 
}


export const saveDeck = (newDeck) => dispatch => (
    saveDeckTitle(newDeck)
        .then(deck => dispatch(addDeck(deck)))
)

export const addDeck = (deck) => {
    return {
        type: TYPES.ADD_DECK,
        deck
    }
}

export const saveCard = (title,newCard) => dispatch => {
    addCardToDeck(title,newCard)
        .then(card => dispatch(addCard(title,card)))
}

export const addCard = (title,card) => {
    return {
        type: TYPES.ADD_CARD,
        title,
        card
    }
}