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
        <Button title="Try again" onPress={loadGames} color={Colors.primary} />
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
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
    <>
      <Search onSearch={searchHandler} />
      <FlatList
        data={games}
        renderItem={itemData => (
          <GameItem
            game={itemData.item}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.name)
            }}
          />
        )}
      />
    </>
  )
}

export const screenOptions = () => {
  return {
    headerTitle: 'game-search-expo'
  }
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})

export default GamesScreen
