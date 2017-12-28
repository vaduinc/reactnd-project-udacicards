import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import { Card } from 'react-native-elements'
import { connect } from 'react-redux'
import { saveDeck} from '../actions/deckActions'
import { NavigationActions } from 'react-navigation'
import GenericButton from './GenericButton'
import styles from '../utils/styles'
import {DECK_DETAILS} from '../navigation'

class DeckEntry extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

	onSubmit = (() => {
    this.props.saveDeck(this.state.title)
      .then(()=> this.goToDeckDetails(this.state.title) )
	})

	goToDeckDetails = (title) => {
		this.props.navigation.navigate(
			DECK_DETAILS,{	title: title	}
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
					{ (this.state.title.length>0 ) && (
				    <GenericButton	onPress={this.onSubmit} styleButton={styles.submitButton} styleLabel={styles.submitButtonLabel} label={'SUBMIT'} />
          )}
        </Card>
			</View>
		)
	}
}

export default connect(	null,{ saveDeck} )(DeckEntry)