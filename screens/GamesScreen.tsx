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

import { StackNavigationProp } from '@react-navigation/stack'
import { GamesStackParamList } from '../navigation/GamesNavigator'

import { RootState } from '../store/store'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/UI/HeaderButton'

import * as Linking from 'expo-linking'

import GameItem from '../components/GameItem'
import Search from '../components/Search'
import * as gamesActions from '../store/actions/games'

import Colors from '../constants/Colors'

type Props = {
  navigation: StackNavigationProp<GamesStackParamList, 'Games'>
}

const GamesScreen = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState<string | null>(null)
  const [error, setError] = useState<string | null>()

  const games = useSelector((state: RootState) => state.games.games)

  const dispatch = useDispatch()

  const loadGames = useCallback(
    async (search: string = '') => {
      setError(null)
      try {
        await dispatch(gamesActions.fetchGames(search))
      } catch (err) {
        setError(err.message)
      }
    },
    [dispatch, setIsLoading, setError]
  )

  useEffect(() => {
    setIsLoading(true)
    loadGames().then(() => {
      setIsLoading(false)
    })
  }, [dispatch, loadGames])

  const searchHandler = async (search: string) => {
    console.log('searching for...', search)
    setIsSearching(search)
    await loadGames(search)
    setIsSearching(null)
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
        <Button
          title='Try again'
          onPress={() => {
            loadGames()
          }}
          color={Colors.primary}
        />
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

  return (
    <View style={styles.gamesScreen}>
      <Search onSearch={searchHandler} />
      {!isLoading && games.length === 0 ? (
        <View style={styles.centered}>
          <Text>No games found.</Text>
        </View>
      ) : isSearching != null ? (
        <View style={styles.centered}>
          <Text>
            {isSearching
              ? `Searching for ${isSearching}...`
              : 'Loading popular games...'}
          </Text>
        </View>
      ) : (
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
      )}
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
