import React, { useCallback, useEffect, useState } from 'react'
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ActivityIndicator
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../store/store'

import Game from '../models/game'

import * as gamesActions from '../store/actions/games'
import Colors from '../constants/Colors'
import Rating from '../components/Rating'

import * as Linking from 'expo-linking'

const GameDetailScreen = (props: any) => {
  const gameId = props.route.params.gameId

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>()

  let game: Game = useSelector((state: RootState) => state.games.games).find(
    (g: Game) => g.id === gameId
  )

  const dispatch = useDispatch()

  const loadGame = useCallback(async () => {
    setError(null)
    try {
      await dispatch(gamesActions.fetchGame(gameId))
    } catch (err) {
      setError(err.message)
    }
  }, [dispatch, setIsLoading, setError, gameId])

  useEffect(() => {
    if (!game) {
      setIsLoading(true)
      loadGame().then(() => {
        setIsLoading(false)
      })
    }
  }, [dispatch, loadGame])

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Text>{error}</Text>
        <Button
          title='Try again'
          onPress={() => {
            loadGame()
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
    <ScrollView>
      <View style={styles.gameDetailScreen}>
        <View style={styles.header}>
          <Image style={styles.image} source={{ uri: game.image }} />
          <Text style={styles.title}>{game.name}</Text>
          <Text>{game.companies.join(', ')}</Text>
          <Rating style={styles.rating} value={game.rating} />
        </View>
        <View>
          <Text style={styles.summary}>{game.summary}</Text>
          <Text>
            <Text style={styles.label}>Release:</Text> {game.date}
          </Text>
          <Text>
            <Text style={styles.label}>Platforms:</Text>{' '}
            {game.platforms.map(p => p.name).join(', ')}
          </Text>
          <Text>
            <Text style={styles.label}>Modes:</Text> {game.modes.join(', ')}
          </Text>
          <Text>
            <Text style={styles.label}>Genre:</Text> {game.genres.join(', ')}
          </Text>
          <Text>
            <Text style={styles.label}>Themes:</Text> {game.themes.join(', ')}
          </Text>
          <Text>
            <Text style={styles.label}>IGDB:</Text>{' '}
            <Text
              style={{ color: Colors.primary }}
              onPress={() => Linking.openURL(game.url)}
            >
              Open on IGDB
            </Text>
          </Text>

          {/* screenshots
          similar games */}
        </View>
      </View>
    </ScrollView>
  )
}

export const screenOptions = (navData: {
  route: { params: { gameName: string } }
}) => {
  return {
    headerTitle: navData.route.params.gameName
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gameDetailScreen: {
    flex: 1,
    margin: 20
  },
  header: {
    alignItems: 'center',
    marginBottom: 10
  },
  image: {
    height: 240,
    width: 180,
    marginBottom: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  rating: {
    marginVertical: 10
  },
  summary: {
    marginBottom: 20
  },
  label: {
    fontWeight: 'bold'
  }
})

export default GameDetailScreen
