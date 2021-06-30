import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { RootState } from '../store/store'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/UI/HeaderButton'

import * as Linking from 'expo-linking'

import GameItem from '../components/GameItem'
import Search from '../components/Search'
import * as gamesActions from '../store/actions/games'

import Colors from '../constants/Colors'

const GamesScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>()

  const games = useSelector((state: RootState) => state.games.games)

  const dispatch = useDispatch()

  const loadGames = useCallback(async () => {
    setError(null)
    try {
      await dispatch(gamesActions.fetchGames())
    } catch (err) {
      setError(err.message)
    }
  }, [dispatch, setIsLoading, setError])

  useEffect(() => {
    setIsLoading(true)
    loadGames().then(() => {
      setIsLoading(false)
    })
  }, [dispatch, loadGames])

  const searchHandler = (search: string) => {
    console.log('searching for...', search)
    // loadGames but FILTERED to search
  }

  const selectItemHandler = (id: number, name: string) => {
    props.navigation.navigate('GameDetail', {
      gameId: id,
      gameName: name
    })
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Text>{error}</Text>
        <Button title='Try again' onPress={loadGames} color={Colors.primary} />
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  if (!isLoading && games.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No games found.</Text>
      </View>
    )
  }

  return (
    <View style={styles.gamesScreen}>
      <Search onSearch={searchHandler} />
      <FlatList
        data={games}
        keyExtractor={item => item.id.toString()}
        renderItem={itemData => (
          <GameItem
            game={itemData.item}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.name)
            }}
          />
        )}
      />
    </View>
  )
}

export const screenOptions = () => {
  return {
    headerTitle: 'game-search-expo',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='GitHub'
          iconName='logo-github'
          onPress={() => {
            Linking.openURL('https://github.com/nunogois/game-search-expo')
          }}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gamesScreen: {
    flex: 1
  }
})

export default GamesScreen
