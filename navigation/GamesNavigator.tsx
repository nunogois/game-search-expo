import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Platform } from 'react-native'

import GamesScreen, {
  screenOptions as gamesScreenOptions
} from '../screens/GamesScreen'
import GameDetailScreen, {
  screenOptions as gameDetailScreenOptions
} from '../screens/GameDetailScreen'

import Colors from '../constants/Colors'

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

export type GamesStackParamList = {
  Games: undefined
  GameDetail: { gameId: number; gameName: string }
}

const GamesStackNavigator = createStackNavigator<GamesStackParamList>()

const GamesNavigator = () => {
  return (
    <GamesStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <GamesStackNavigator.Screen
        name='Games'
        component={GamesScreen}
        options={gamesScreenOptions}
      />
      <GamesStackNavigator.Screen
        name='GameDetail'
        component={GameDetailScreen}
        options={gameDetailScreenOptions}
      />
    </GamesStackNavigator.Navigator>
  )
}

export default GamesNavigator
