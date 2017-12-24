import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet  } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { white, orange, green, red, grey, darkGrey ,pink,lightPurp} from '../utils/colors'
import GenericButton from './GenericButton'

function Card({ textDisplayed, linkToFlip, flipFunc }) {
	return (
		<View style={styles.card}>
			<Text style={styles.mainText}> 
      	{textDisplayed}
			</Text>
			<Text onPress={() => flipFunc()} style={styles.secondaryText}	>
				{linkToFlip}
			</Text>
		</View>
	)
}

class Quiz extends Component {
	state = {
		currentQuestion: 0,
		numberOfQuestions: 0,
		correctAnswers: 0,
		incorrectAnswers: 0,
		front: true
	}

	componentDidMount() {
    const deckTitle = this.props.navigation.state.params.title
		const questions = this.props.decks[deckTitle].questions
		this.setState({
			numberOfQuestions : questions.length
		})
	}

  onSubmitAnswer = ((selectedCorrect) => {
		const currentQuestion = this.state.currentQuestion
		const numberOfQuestions = this.state.numberOfQuestions
    
    if (currentQuestion <= numberOfQuestions - 1) {
			this.setState((prevState) => ({
        correctAnswers : selectedCorrect?prevState.correctAnswers+1:prevState.correctAnswers ,
        incorrectAnswers : selectedCorrect?prevState.incorrectAnswers:prevState.incorrectAnswers + 1
			}))
		}
		if (currentQuestion < numberOfQuestions - 1) {
			this.setState((prevState) => ({
				currentQuestion: prevState.currentQuestion + 1,
				front: true
			}))
		}
	})

	flipCard = (() => {
		this.setState((prevState) => ({
			front: !prevState.front
		}))
	})

	displayCard = ((question, answer, flipCard) => {
		const totalAnswers = this.state.correctAnswers + this.state.incorrectAnswers
		const numberOfQuestions = this.state.numberOfQuestions

		return (
			<View>
				 { (totalAnswers !== numberOfQuestions) && (
          <View>  
            <Card
              textDisplayed={ this.state.front === true? question:answer}
              linkToFlip={this.state.front === true? 'Answer':'Question'}
              flipFunc={flipCard}
            /> 
            <View>
              <GenericButton	onPress={() =>{this.onSubmitAnswer(true)}} styleButton={styles.correctButton} styleLabel={styles.submitButtonLabel} label={'Correct'} />
              <GenericButton	onPress={() =>{this.onSubmitAnswer(false)}} styleButton={styles.incorrectButton} styleLabel={styles.submitButtonLabel} label={'Incorrect'} />
            </View>
          </View>
        )} 

        { (totalAnswers === numberOfQuestions) && (
           <View>
            <Card
              textDisplayed={'You answered correctly to ' + (this.state.correctAnswers  * 100 / totalAnswers) + '% of the questions.'}
            />
            <GenericButton	onPress={() => this.props.navigation.navigate('DeckDetails',	{title: this.props.navigation.state.params.title	}	)} 
                styleButton={styles.backDetailsButton} 
                styleLabel={styles.backDetailsLabel} 
                label={'Back to Details'} />
  
            <GenericButton	onPress={() => this.props.navigation.navigate('Quiz',	{title: this.props.navigation.state.params.title	}	)} 
                styleButton={styles.quizAgainButton} 
                styleLabel={styles.submitButtonLabel} 
                label={'Take quiz again'} />              
         </View> 
        )}  

			</View>

		)
})

	render() {
    const deckTitle = this.props.navigation.state.params.title
    const questions = this.props.decks[deckTitle].questions
    const question = questions[this.state.currentQuestion].question
		const answer = questions[this.state.currentQuestion].answer
		const correctAnswers = this.state.correctAnswers
		const incorrectAnswers = this.state.incorrectAnswers
		const totalAnswers = correctAnswers + incorrectAnswers
		const numberOfQuestions = this.state.numberOfQuestions

		return (
			<View style={styles.container}>
				<Text style={styles.counter}>
					{
						totalAnswers + ' / ' + numberOfQuestions
					}
				</Text>
				{ this.displayCard(question, answer, this.flipCard) }
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		backgroundColor: white
	},
	correctButton: {
		backgroundColor: lightPurp,
		padding: 10,
		height: 45,
		marginLeft: 100,
		marginRight: 100,
		marginTop: 10,
		borderRadius: 6,
		justifyContent: 'center',
		alignItems: 'center'
	},
	incorrectButton: {
		backgroundColor: red,
		padding: 10,
		height: 45,
		marginLeft: 100,
		marginRight: 100,
		marginTop: 10,
		borderRadius: 6,
		justifyContent: 'center',
		alignItems: 'center'
	},
	submitButtonLabel: {
		color: pink,
		fontSize: 22,
		textAlign: 'center'
	},
	backDetailsButton: {
		backgroundColor: pink,
		padding: 10,
		height: 45,
		marginLeft: 100,
		marginRight: 100,
		marginTop: 10,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: grey,
		justifyContent: 'center',
		alignItems: 'center'
	},
	backDetailsLabel: {
		color: orange,
		fontSize: 22,
		textAlign: 'center'
	},
	quizAgainButton: {
		backgroundColor: orange,
		padding: 10,
		height: 45,
		marginLeft: 100,
		marginRight: 100,
		marginTop: 10,
		borderRadius: 6,
		justifyContent: 'center',
		alignItems: 'center'
	},
	mainText: {
		color: darkGrey,
		fontSize: 34,
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
	card: {
		marginTop: 140,
		marginBottom: 80
	}
})


const mapStateToProps = ({ decks }) => ({
  decks
})

export default connect(mapStateToProps)(Quiz)