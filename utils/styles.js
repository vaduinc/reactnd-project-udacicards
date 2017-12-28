import React, {StyleSheet} from 'react-native'
import { white, orange, black, red, gray, darkGrey ,pink,lightPurp} from './colors'

export default StyleSheet.create({
////////// GENERAL /////////////////////////////    
  container: {
    flex: 1,
    backgroundColor: orange
  },
  card: {
    backgroundColor: white,
    padding: 20,
    borderRadius: 10
  },
  submitButtonLabel: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  submitButton: {
    backgroundColor: pink,
    padding: 10,
    height: 45,
    marginLeft: 100,
    marginRight: 100,
    marginTop: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: black,
    marginTop: 60,
    height: 40,
    width: 270,
    alignSelf: 'center'
  }  
  /////////////  QUIZ /////////////////////////
  ,quizAgainButton: {
		backgroundColor: black,
		padding: 2,
		height: 45,
		marginLeft: 80,
		marginRight: 80,
		marginTop: 10,
		borderRadius: 6,
		justifyContent: 'center',
		alignItems: 'center'
	},
	correctButton: {
		backgroundColor: lightPurp,
	},
	incorrectButton: {
		backgroundColor: red,
	},
	mainText: {
		color: darkGrey,
		fontSize: 30,
		textAlign: 'center'
	},
	secondaryText: {
		color: red,
		fontSize: 14,
		textAlign: 'center'
	},
	counter: {
		color: darkGrey,
		marginLeft: 10,
		marginTop: 10,
		fontSize: 16,
	},
	frontCard: {
        backgroundColor: gray,
        padding: 20,
        marginTop: 90,
        marginBottom: 40,
        borderRadius: 6,
    },
    backCard: {
        backgroundColor: white
    }
  /////////// DECK DETAILS //////////////
	,addCardButton: {
		backgroundColor: orange,
		padding: 10,
		height: 45,
		width: 120,
		marginLeft: 100,
		marginTop: 10,
		borderRadius: 6,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	addCardLabel: {
		color: pink,
		fontSize: 16,
		textAlign: 'center'
	},
	quizButton: {
		backgroundColor: black,
		padding: 10,
		height: 45,
		width: 200,
		marginLeft: 100,
		marginRight: 100,
		marginTop: 10,
		borderRadius: 6,
		justifyContent: 'center',
		alignItems: 'center'
	},
	quizButtonLabel: {
		color: pink,
		fontSize: 16,
		textAlign: 'center'
	},
	deckTitle: {
		color: lightPurp,
		fontSize: 32,
		textAlign: 'center'
	},
	cardsNumber: {
		color: black,
		fontSize: 22,
		textAlign: 'center'
	},
	textContainer: {
		marginTop: 80,
		marginBottom: 120
    }
/////////////// DECK ENTRY //////////
	,question: {
		color: lightPurp,
		fontSize: 32,
		textAlign: 'center',
		marginTop: 80
	}
////////////// CARD ENTRY ///////////////
    ,message: {
        color: red,
        fontSize: 16,
        textAlign: 'center'
    },
    inputContainer: {
        marginTop: 30,
        marginBottom: 60
    }

///////////// DECKS //////////////////
    ,items: {
		textAlign: 'center',
		fontSize: 32,
    }    
})
