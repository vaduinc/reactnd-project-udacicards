import React from 'react'
import { Text, TouchableOpacity} from 'react-native'

const GenericButton = props => {

    return (
        <TouchableOpacity
            style={props.styleButton}
            onPress={props.onPress}>
            <Text style={props.styleLabel}>{props.label}</Text>
        </TouchableOpacity>
    )
}

export default GenericButton