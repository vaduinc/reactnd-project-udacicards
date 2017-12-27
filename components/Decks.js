import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, FlatList } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import {fetchDecks} from '../actions/deckActions'
import styles from '../utils/styles'
import * as COLORS from '../utils/colors'

class Decks extends Component {   

  colores = Object.keys(COLORS)

  componentDidMount() {
    this.props.fetchDecks()
  }

   goToDeckDetails = (item) =>{
     this.props.navigation.navigate('DeckDetails',
        {
          title: item.title
        })
   }

  renderItem =(data) =>{
    let { item, index } = data;
    return <ListItem titleStyle={styles.items} subtitleStyle={styles.items}
        title={item.title}
        subtitle={`${item.questions.length} cards`}
        containerStyle={{ borderBottomWidth: 0 , backgroundColor: COLORS[this.colores[(index % this.colores.length-1) + 1]] }}
        onPress={() => {this.goToDeckDetails(item)}}
      />
  }


  render() {

    const { decks } = this.props
    const deckCollection = Object.keys(decks).map((key) => { return decks[key] }) || []

    return (
      <View style={styles.container}>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList 
              data={deckCollection}
              renderItem={this.renderItem}
              keyExtractor={item => item.title}
          />
        </List>
      </View>
    )
  }
}

const mapStateToProps = ({ decks }) => ({
  decks
})

export default connect(mapStateToProps,{fetchDecks})(Decks)