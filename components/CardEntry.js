import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { white, orange, red, grey } from '../utils/colors'
import { saveCard } from '../actions/deckActions'
import { Card } from 'react-native-elements'
import GenericButton from './GenericButton'

class CardEntry extends Component {
	state = {
		question: '',
		answer: ''
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
	//	justifyContent: 'flex-start',
		backgroundColor: red
    },
    card: {
        backgroundColor: white,
        padding: 20,
        borderRadius: 10
        },
        submitButton: {
		backgroundColor: orange,
		padding: 10,
        height: 45,
        marginTop: 10,
		marginLeft: 100,
		marginRight: 100,
		borderRadius: 6,
		justifyContent: 'center',
		alignItems: 'center'
	},
	submitButtonLabel: {
		color: white,
		fontSize: 22,
		textAlign: 'center'
	},
	message: {
		color: red,
		fontSize: 16,
		textAlign: 'center'
	},
	input: {
		borderRadius: 4,
		borderWidth: 1,
		borderColor: grey,
		marginTop: 30,
		height: 40,
		width: 300,
		alignSelf: 'center'
	},
	inputContainer: {
		marginTop: 80,
		marginBottom: 60
	}
})

export default connect(	null,{ saveCard} )(CardEntry)