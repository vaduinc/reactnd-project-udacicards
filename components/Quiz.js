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

function QuizResults({deckTitle, textDisplayed, nav}) {
	return (
    <View>
      <Card
        textDisplayed={textDisplayed}
      />
      <GenericButton	onPress={() => { nav.goBack(null) ; nav.navigate('Quiz',	{title: deckTitle	}	) }  } 
          styleButton={styles.quizAgainButton} 
          styleLabel={styles.submitButtonLabel} 
          label={'Take quiz again'} />         

    </View> 
	)
}

class Quiz extends Component {
	state = {
    front: true,
		currentQuestion: 0,
    correctAnswers: 0,
		incorrectAnswers: 0,
    numberOfQuestions: 0
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

	onFlipCard = (() => {
		this.setState((prevState) => ({
			front: !prevState.front
		}))
	})

	render() {
    const questions = this.props.decks[this.props.navigation.state.params.title].questions
    const question = questions[this.state.currentQuestion].question
		const answer = questions[this.state.currentQuestion].answer
    const totalAnswers = this.state.correctAnswers + this.state.incorrectAnswers
    const numberOfQuestions = this.state.numberOfQuestions

		return (
			<View style={styles.container}>
          <Text style={styles.counter}>
            {
              `${totalAnswers}  /  ${this.state.numberOfQuestions}`
            }
          </Text>
          
          <View>
          { (totalAnswers !== numberOfQuestions) && (

            <View>  
              <Card
                textDisplayed={ this.state.front === true? question:answer}
                linkToFlip={this.state.front === true? 'Answer':'Question'}
                flipFunc={this.onFlipCard}
              /> 
              <View>
                <GenericButton	onPress={() =>{this.onSubmitAnswer(true)}} styleButton={styles.correctButton} styleLabel={styles.submitButtonLabel} label={'Correct'} />
                <GenericButton	onPress={() =>{this.onSubmitAnswer(false)}} styleButton={styles.incorrectButton} styleLabel={styles.submitButtonLabel} label={'Incorrect'} />
              </View>
            </View>
          )} 

          { (totalAnswers === numberOfQuestions) && (
              <QuizResults
                deckTitle={this.props.navigation.state.params.title}
                textDisplayed={`You answered correctly to ${(this.state.correctAnswers  * 100 / totalAnswers)} % of the questions.`}
                nav={this.props.navigation}
            /> 
          )}  
        </View>  

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