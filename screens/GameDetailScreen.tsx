import React from 'react'
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity
} from 'react-native'

import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { GamesStackParamList } from '../navigation/GamesNavigator'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/UI/HeaderButton'

import * as Linking from 'expo-linking'

import Rating from '../components/Rating'
import Carousel from 'react-native-snap-carousel'

import Colors from '../constants/Colors'

import { useGame } from '../hooks/Games'

type Props = {
  route: RouteProp<GamesStackParamList, 'GameDetail'>
  navigation: StackNavigationProp<GamesStackParamList, 'GameDetail'>
}

const GameDetailScreen = (props: Props) => {
  const gameId = props.route.params.gameId

  const { game, isLoading, error, reload } = useGame(gameId)

  const Screen = Dimensions.get('window')

  const selectItemHandler = (id: number, name: string) => {
    props.navigation.push('GameDetail', {
      gameId: id,
      gameName: name
    })
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  if (!game || error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
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
    <ScrollView>
      <View style={styles.gameDetailScreen}>
        <View style={styles.header}>
          <Image style={styles.image} source={{ uri: game.image }} />
          <Text style={styles.title}>{game.name}</Text>
          <Text>{game.companies.join(', ')}</Text>
          <Rating style={styles.rating} value={game.rating} />
        </View>
        <View>
          <Text style={styles.headerTitle}>Description</Text>
          <Text>{game.summary}</Text>
          <Text style={styles.headerTitle}>Information</Text>
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
              onPress={() => game && Linking.openURL(game.url)}
            >
              Open on IGDB
            </Text>
          </Text>

          <Text style={styles.headerTitle}>Screenshots</Text>
          <View style={styles.centered}>
            <Carousel
              data={game.screenshots}
              itemWidth={300}
              sliderWidth={Screen.width}
              renderItem={item => (
                <Image style={styles.screenshot} source={{ uri: item.item }} />
              )}
            />
          </View>

          <Text style={styles.headerTitle}>Similar Games</Text>
          <View style={styles.centered}>
            <Carousel
              data={game.similar}
              itemWidth={180}
              sliderWidth={Screen.width}
              renderItem={item => (
                <TouchableOpacity
                  onPress={() => {
                    selectItemHandler(item.item.id, item.item.name)
                  }}
                >
                  <Image
                    style={styles.similarImage}
                    source={{ uri: item.item.image }}
                  />
                  <View style={styles.similarLabel}>
                    <Text style={styles.similarText}>{item.item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export const screenOptions = (navData: Props) => {
  return {
    headerTitle: navData.route.params.gameName,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Home'
          iconName='search-outline'
          onPress={() => {
            navData.navigation.navigate('Games')
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
  gameDetailScreen: {
    flex: 1,
    margin: 20
  },
  header: {
    alignItems: 'center'
  },
  image: {
    height: 288,
    width: 216,
    marginBottom: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20,
    marginBottom: 10
  },
  rating: {
    marginTop: 10
  },
  label: {
    fontWeight: 'bold'
  },
  screenshot: {
    height: 180,
    width: 300
  },
  similarImage: {
    height: 240,
    width: 180
  },
  similarLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    opacity: 0.7,
    backgroundColor: 'black',
    justifyContent: 'center',
    padding: 10
  },
  similarText: {
    color: 'white'
  }
})

export default GameDetailScreen
