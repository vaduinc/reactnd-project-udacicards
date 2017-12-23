import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Card } from 'react-native-elements'
import { connect } from 'react-redux'
import { saveDeck} from '../actions/deckActions'
import { NavigationActions } from 'react-navigation'
import { white, pink, grey, lightPurp, blue } from '../utils/colors'
import GenericButton from './GenericButton'

class DeckEntry extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

	onSubmit = (() => {
    //console.log(this.state.title)
    this.props.saveDeck(this.state.title)
      .then(()=> this.goToDeckDetails(this.state.title) )
	})

	goToDeckDetails = (title) => {
		this.props.navigation.navigate(
			'DeckDetails',{	title: title	}
		)
	}

	render() {
		return (
			<View style={styles.container}>
        <Card containerStyle={styles.card} >
          <View>
              <Text style={styles.question}>
                What is the title of your new deck?
              </Text>
          </View>
          <TextInput
            placeholder='Title'
            value={this.state.title}
            onChangeText={(title) => this.setState({title})}
            maxLength={20}
            style={styles.input}
          />
          <GenericButton	onPress={this.onSubmit} 
              styleButton={styles.submitButton} 
              styleLabel={styles.submitButtonLabel} label={'SUBMIT'} />
        </Card>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: blue
  },
  card: {
    backgroundColor: white,
    padding: 20,
		borderRadius: 10
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
	submitButtonLabel: {
		color: white,
		fontSize: 22,
		textAlign: 'center'
	},
	question: {
		color: lightPurp,
		fontSize: 32,
		textAlign: 'center',
		marginTop: 80
	},
	input: {
		borderRadius: 4,
		borderWidth: 1,
		borderColor: grey,
		marginTop: 60,
		height: 40,
		width: 270,
		alignSelf: 'center'
	}
})

export default connect(	null,{ saveDeck} )(DeckEntry)