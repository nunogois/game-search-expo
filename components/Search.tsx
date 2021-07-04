import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'

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
          onChangeText={text => {
            setSearch(text)
          }}
        />
      </View>
      <View style={styles.button}>
        <Button
          title='Search'
          color={Colors.primary}
          onPress={() => {
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
    borderWidth: 1
  },
  input: {
    paddingHorizontal: 5,
    paddingVertical: 3
  },
  search_input: {
    flex: 0.8
  },
  button: {
    flex: 0.2
  }
})

export default Search
