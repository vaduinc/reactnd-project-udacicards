import * as TYPES from '../actions/actionTypes'

export function decks(state = {}, action) {
	switch(action.type) {
		case TYPES.RECEIVE_DECKS: 
			console.log(JSON.stringify(action.decks))
			return {
				...state,
				...action.decks
			}
		case TYPES.ADD_DECK:
			console.log(JSON.stringify(action.deck))
			return {
				...state,
				...action.deck
			}
		case TYPES.ADD_CARD:
			const deckTitle = action.title
			const card = action.card
			return result = {
				...state,
				[deckTitle]: {
					...state[deckTitle],
					questions: [
						...state[deckTitle].questions,
						{
							question: card.question,
							answer: card.answer
						}
					]
				}
			}
		default:
			return state
	}
}