import React, { Component } from 'react'
import { View, Text, TouchableOpacity  } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import GenericButton from './GenericButton'
import { Card } from 'react-native-elements'
import styles from '../utils/styles'
import { clearLocalNotification, setLocalNotification } from '../utils/notifications'

function QuestionAnswer({ textDisplayed, flipText, flipFunc }) {
	return (
    <Card containerStyle={[styles.frontCard,flipText==='Question'?styles.frontCard:styles.backCard]}>
      <Text style={styles.mainText}> 
        {textDisplayed}
      </Text>
      <Text onPress={() => flipFunc()} style={styles.secondaryText}	>
        {flipText}
      </Text>
    </Card>
	)
}

function QuizResults({deckTitle, textDisplayed, nav}) {

  clearLocalNotification()
       .then(setLocalNotification)
       
	return (
    <View>
      <QuestionAnswer
        textDisplayed={textDisplayed}
        flipFunc={()=>console.log('take quiz again')}
      />
      <GenericButton	onPress={() => { nav.goBack(null) ; nav.navigate('Quiz',	{title: deckTitle	}	) }  } 
          styleButton={styles.quizAgainButton} 
          styleLabel={styles.submitButtonLabel} 
          label={'Take quiz again'} />         

    </View> 
	)
}

class Quiz extends Component {

  constructor(props) {
    super(props)
    this.state = {
      front: true,
      currentQuestion: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      numberOfQuestions: 0
    }
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
              <QuestionAnswer
                textDisplayed={ this.state.front === true? question:answer}
                flipText={this.state.front === true? 'Answer':'Question'}
                flipFunc={this.onFlipCard}
              /> 
              <View>
                <GenericButton	onPress={() =>{this.onSubmitAnswer(true)}} styleButton={[styles.quizAgainButton,styles.correctButton]} styleLabel={styles.submitButtonLabel} label={'Correct'} />
                <GenericButton	onPress={() =>{this.onSubmitAnswer(false)}} styleButton={[styles.quizAgainButton,styles.incorrectButton]} styleLabel={styles.submitButtonLabel} label={'Incorrect'} />
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

const mapStateToProps = ({ decks }) => ({
  decks
})

export default connect(mapStateToProps)(Quiz)