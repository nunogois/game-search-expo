import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Keyboard
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import Colors from '../constants/Colors'

interface SearchProps {
  onSearch: (search: string) => void
}

const Search = (props: SearchProps) => {
  const [search, setSearch] = useState('')

  return (
    <View style={styles.search}>
      <View style={styles.search_input}>
        <TextInput
          style={styles.input}
          value={search}
          placeholder='Search'
          returnKeyType='search'
          onChangeText={text => {
            setSearch(text)
          }}
          onSubmitEditing={() => {
            props.onSearch(search)
          }}
        />
      </View>
      <View style={styles.button}>
        {!!search && (
          <Text
            style={styles.clear}
            onPress={() => {
              Keyboard.dismiss()
              setSearch('')
              props.onSearch('')
            }}
          >
            <Ionicons name='close-outline' size={24}></Ionicons>
          </Text>
        )}
        <Button
          title='Search'
          color={Colors.primary}
          onPress={() => {
            Keyboard.dismiss()
            props.onSearch(search)
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  search: {
    margin: 10,
    flexDirection: 'row',
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  input: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    paddingLeft: 10
  },
  search_input: {
    flex: 1
  },
  clear: {
    color: Colors.primary,
    marginRight: 10
  },
  button: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default Search
