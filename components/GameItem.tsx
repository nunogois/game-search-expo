import React from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'

import Game from '../models/game'

interface GameItemProps {
  game: Game
  onSelect: () => void
}

const GameItem = (props: GameItemProps) => {
  return (
    <TouchableOpacity onPress={props.onSelect}>
      <View style={styles.card}>{props.game.name}</View>
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
    backgroundColor: 'white'
  }
})

export default GameItem
