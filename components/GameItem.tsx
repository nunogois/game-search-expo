import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'

import { AnimatedCircularProgress } from 'react-native-circular-progress'

import Game from '../models/game'

interface GameItemProps {
  game: Game
  onSelect: () => void
}

const GameItem = (props: GameItemProps) => {
  let ratingColor = '#e35049'
  if (props.game.rating > 50) ratingColor = '#f09f43'
  if (props.game.rating > 60) ratingColor = '#f0c843'
  if (props.game.rating > 70) ratingColor = '#f5f11d'
  if (props.game.rating > 80) ratingColor = '#cdf51d'
  if (props.game.rating > 85) ratingColor = '#b4f51d'
  if (props.game.rating > 90) ratingColor = '#82f51d'
  if (props.game.rating > 95) ratingColor = '#6cf51d'

  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.card}>
        <View style={styles.gameItem}>
          <Image style={styles.image} source={{ uri: props.game.image }} />
          <View style={styles.gameInfo}>
            <View>
              <Text style={styles.title}>{props.game.name}</Text>
              <Text style={styles.subtitle}>{props.game.date}</Text>
            </View>
            <View style={styles.platforms}>
              {props.game.platforms.map(p => (
                <Image style={styles.platform} key={p} source={{ uri: p }} />
              ))}
            </View>
          </View>
          <View style={styles.rating}>
            <AnimatedCircularProgress
              size={50}
              width={3}
              rotation={0}
              fill={props.game.rating}
              tintColor={ratingColor}
            >
              {() => <Text>{props.game.rating}</Text>}
            </AnimatedCircularProgress>
          </View>
        </View>
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
    padding: 10,
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
    flex: 0.2
  }
})

export default GameItem
