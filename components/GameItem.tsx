import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'

import Game from '../models/game'
import Rating from './Rating'

interface GameItemProps {
  game: Game
  onSelect: () => void
}

const GameItem = (props: GameItemProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={props.onSelect}>
      <View style={styles.gameItem}>
        <Image style={styles.image} source={{ uri: props.game.image }} />
        <View style={styles.gameInfo}>
          <View>
            <Text style={styles.title}>{props.game.name}</Text>
            <Text style={styles.subtitle}>{props.game.date}</Text>
          </View>
          <View style={styles.platforms}>
            {props.game.platforms.map(p => (
              <Image
                style={styles.platform}
                key={p.name}
                source={{ uri: p.logo }}
              />
            ))}
          </View>
        </View>
        <Rating style={styles.rating} value={props.game.rating} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 5,
    overflow: 'hidden'
  },
  image: {
    height: 120,
    width: 90,
    marginRight: 10
  },
  gameItem: {
    flexDirection: 'row'
  },
  title: {
    fontSize: 16
  },
  subtitle: {
    fontSize: 10
  },
  gameInfo: {
    justifyContent: 'space-between',
    paddingVertical: 10,
    flex: 0.8
  },
  platforms: {
    flexDirection: 'row'
  },
  platform: {
    height: 20,
    width: 20,
    marginHorizontal: 2
  },
  rating: {
    justifyContent: 'center',
    paddingRight: 10,
    flex: 0.2
  }
})

export default GameItem
