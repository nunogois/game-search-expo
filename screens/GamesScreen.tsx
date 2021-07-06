import React, { useState } from 'react'
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet
} from 'react-native'

import { StackNavigationProp } from '@react-navigation/stack'
import { GamesStackParamList } from '../navigation/GamesNavigator'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/UI/HeaderButton'

import * as Linking from 'expo-linking'

import GameItem from '../components/GameItem'
import Search from '../components/Search'

import Colors from '../constants/Colors'

import { useGames } from '../hooks/Games'

type Props = {
  navigation: StackNavigationProp<GamesStackParamList, 'Games'>
}

const GamesScreen = (props: Props) => {
  const [search, setSearch] = useState('')

  const { games, isLoading, error, reload } = useGames(search)

  const searchHandler = async (search: string) => {
    setSearch(search)
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
        <Text>Something went wrong.</Text>
        <Button
          title='Try again'
          onPress={() => {
            reload()
          }}
          color={Colors.primary}
        />
      </View>
    )
  }

  return (
    <View style={styles.gamesScreen}>
      <Search onSearch={searchHandler} />
      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size='large' color={Colors.primary} />
          <Text>
            {search ? `Searching for ${search}...` : 'Loading popular games...'}
          </Text>
        </View>
      ) : !isLoading && games.length === 0 ? (
        <View style={styles.centered}>
          <Text>No games found.</Text>
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
