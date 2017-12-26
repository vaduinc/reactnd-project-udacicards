import React from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Decks from '../components/Decks'
import DeckDetails from '../components/DeckDetails'
import CardEntry from '../components/CardEntry'
import Quiz from '../components/Quiz'
import DeckEntry from '../components/DeckEntry'
import { View, Platform, StatusBar ,Button} from 'react-native'
import { purple, white, orange } from '../utils/colors'

const Tabs = TabNavigator({
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'Deck List',
        tabBarIcon: ({ tintColor }) =>  <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
      },
    },
    DeckEntry: {
      screen: DeckEntry,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} 
        />
      },
    },
  }, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  })
  
export default MainNavigator = StackNavigator({
    Home: {
      screen: Tabs,
    },
    DeckDetails: {
      screen: DeckDetails,
      navigationOptions: ({navigation}) => ({
        headerLeft: <Button title='<' onPress={() => navigation.navigate('Home')} />,
        title: 'Card Details',
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
        }
      })
    },
    CardEntry: {
      screen: CardEntry,
      navigationOptions: ({navigation}) => ({
        title: `${navigation.state.params.title}`,
        headerStyle: {
          backgroundColor: purple,
        },
        headerTitleStyle: {
          color: white
        },
        headerTintColor: white
      })
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        title: 'Quiz',
        headerStyle: {
          backgroundColor: orange,
        },
        headerTitleStyle: {
          color: white
        },
        headerTintColor: white
      }
    }
  })