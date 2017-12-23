import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { List, ListItem, SearchBar } from 'react-native-elements'
import {fetchDecks} from '../actions/deckActions'


function renderSeparator () {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: "#CED0CE",
      }}
    />
  )
}

class Decks extends Component {   

  componentDidMount() {
    this.props.fetchDecks()
  }

   goToDeckDetails = (item) =>{
     console.log(item)
     this.props.navigation.navigate('DeckDetails',
        {
          title: item.title
        })
   }

  renderItem =({item}) =>{
    return <ListItem titleStyle={styles.items} subtitleStyle={styles.items}
        title={item.title}
        subtitle={`${item.questions.length} cards`}
        containerStyle={{ borderBottomWidth: 0 }}
        onPress={() => {this.goToDeckDetails(item)}}
      />
  }


  render() {

    const { decks } = this.props
    const deckCollection = Object.keys(decks).map((key) => { return decks[key] }) || []

    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList 
            data={deckCollection}
            renderItem={this.renderItem}
            keyExtractor={item => item.title}
            ItemSeparatorComponent={renderSeparator}
        />
      </List>
    )
  }
}

const mapStateToProps = ({ decks }) => ({
  decks
})

export default connect(mapStateToProps,{fetchDecks})(Decks)

const styles = StyleSheet.create({
  items: {
    textAlign: 'center'
  },
})