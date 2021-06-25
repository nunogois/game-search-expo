import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import GamesNavigator from '../navigation/GamesNavigator'

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <GamesNavigator />
    </NavigationContainer>
  )
}

export default AppNavigator
