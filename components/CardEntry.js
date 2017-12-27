import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { saveCard } from '../actions/deckActions'
import { Card } from 'react-native-elements'
import GenericButton from './GenericButton'
import styles from '../utils/styles'

class CardEntry extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			question: '',
			answer: ''
		}
	  }

	onSubmit = () => {
		const { question, answer } = this.state
		const deckTitle = this.props.navigation.state.params.title
        this.props.saveCard(deckTitle ,{question, answer})
        this.props.navigation.dispatch(NavigationActions.back())
	}

	render() {
		return (
			<View style={styles.container}>
                <Card containerStyle={styles.card} >
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Enter question'
                            value={this.state.question}
                            onChangeText={(question) => this.setState({question})}
                            maxLength={50}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Enter answer'
                            value={this.state.answer}
                            onChangeText={(answer) => this.setState({answer})}
                            maxLength={50}
                            style={styles.input}
                        />
                    </View>
                </Card>
				
                { (this.state.question.length>0 && this.state.answer.length>0) && (
				    <GenericButton	onPress={this.onSubmit} styleButton={styles.submitButton} styleLabel={styles.submitButtonLabel} label={'SUBMIT'} />
                )}
			</View>
		)
	}
}

export default connect(	null,{ saveCard} )(CardEntry)