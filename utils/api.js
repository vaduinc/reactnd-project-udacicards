import { AsyncStorage } from 'react-native'

const UDACICARDS_STORAGE_KEY = 'udacicards'

const TEST_DATA = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

export const setupData = () => {
    AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(TEST_DATA))
    return TEST_DATA;
}  

export function getDecks(){
    return AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
        //.then((results) => {console.log(results)} )
        .then((results) => {return results === null ? setupData() : JSON.parse(results)} )
        //.then((results) => {return setupData() } )
}

export function getDeck(id){
    
}

export function saveDeckTitle(title){
    const newDeck = { [title] : {title: title, questions:[]}}
    console.log(newDeck)
    AsyncStorage.mergeItem(UDACICARDS_STORAGE_KEY, JSON.stringify(newDeck))
    return Promise.resolve(newDeck)
}

export function addCardToDeck(title, card){
   
    console.log(title)
    console.log(card)

    AsyncStorage.getItem(UDACICARDS_STORAGE_KEY)
        .then((result) => {
            const decks = JSON.parse(result)
        
            let cardChosen = decks[title]
            cardChosen.questions.push({
                question: card.question,
                answer: card.answer
            })

            decks[title] = cardChosen;

            AsyncStorage.setItem(UDACICARDS_STORAGE_KEY, JSON.stringify(decks))

        })
    
    return Promise.resolve(card)
}
