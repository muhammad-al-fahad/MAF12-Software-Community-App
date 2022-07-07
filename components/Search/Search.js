import React, { useState  } from 'react'
import { View, TextInput, StyleSheet} from 'react-native';
import Load_city from './SearchLoad'

export default function SearchBar({load, setCityName}) {
    const [city, setCity] = useState('')
    return (
        <View style={styles.searchBar}>
            <TextInput 
                placeholder='Enter City name'
                value={city}
                onChangeText={(text) => setCity(text)}
            />
            {setCityName(city)}
            <Load_city load = {load}/>
            </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 180,
        borderWidth: 1.5,
        paddingVertical: 10,
        borderRadius: 25,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        backgroundColor: 'lightgray',
        borderColor: 'lightgray',
        marginLeft: 130
    }
})