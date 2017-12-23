import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { white, pink, grey, lightPurp,orange } from '../utils/colors'
import { connect } from 'react-redux'
import { Card } from 'react-native-elements'
import GenericButton from './GenericButton'

class DeckDetails extends Component {
  
	render() {
		const deckTitle = this.props.navigation.state.params.title
		const questionsNumber = this.props.decks[deckTitle].questions.length
		return (
			<View style={styles.container}>
        <Card containerStyle={styles.card} >
          <View style={styles.textContainer}>
            <Text style={styles.deckTitle}>
              {deckTitle}
            </Text>
            <Text	style={styles.cardsNumber}>
              {`${questionsNumber} cards`}
            </Text>
          </View>
          <View>
					<GenericButton	onPress={() => this.props.navigation.navigate('CardEntry', { title: deckTitle	})} 
							styleButton={styles.addCardButton} 
							styleLabel={styles.addCardLabel} 
							label={'Add Card'} />
          </View>
        </Card>
          { questionsNumber>0 && (

							<GenericButton	onPress={() => this.props.navigation.navigate('Quiz', { title: deckTitle })} 
									styleButton={styles.quizButton} 
									styleLabel={styles.quizButtonLabel} 
									label={'Start Quiz'} />
          )}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: orange
  },
  card: {
    backgroundColor: white,
    padding: 20,
		borderRadius: 10
	},
	addCardButton: {
		backgroundColor: white,
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
		backgroundColor: white,
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
		color: grey,
		fontSize: 22,
		textAlign: 'center'
	},
	textContainer: {
		marginTop: 120,
		marginBottom: 120
	}
})

const mapStateToProps = ({ decks }) => ({
  decks
})

export default connect(mapStateToProps)(DeckDetails)