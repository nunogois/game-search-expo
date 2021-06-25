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
      <Text style={styles.label}>Search</Text>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={text => {
          setSearch(text)
        }}
      />
      <Button
        title="Search"
        color={Colors.primary}
        onPress={() => {
          props.onSearch(search)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  search: {
    width: '100%'
  },
  label: {
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
})

export default Search
