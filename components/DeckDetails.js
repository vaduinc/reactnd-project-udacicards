import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Card } from 'react-native-elements'
import GenericButton from './GenericButton'
import styles from '../utils/styles'

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

const mapStateToProps = ({ decks }) => ({
  decks
})

export default connect(mapStateToProps)(DeckDetails)