import React from 'react'
import { View, Text } from 'react-native'

import { AnimatedCircularProgress } from 'react-native-circular-progress'

interface RatingProps {
  value: number
  style?: any
}

const Rating = (props: RatingProps) => {
  let ratingColor = '#e35049'
  if (props.value > 50) ratingColor = '#f09f43'
  if (props.value > 60) ratingColor = '#f0c843'
  if (props.value > 70) ratingColor = '#f5f11d'
  if (props.value > 80) ratingColor = '#cdf51d'
  if (props.value > 85) ratingColor = '#b4f51d'
  if (props.value > 90) ratingColor = '#82f51d'
  if (props.value > 95) ratingColor = '#6cf51d'

  return (
    <View style={props.style}>
      {!isNaN(props.value) && (
        <AnimatedCircularProgress
          size={50}
          width={3}
          rotation={0}
          fill={props.value}
          tintColor={ratingColor}
        >
          {() => <Text>{props.value}</Text>}
        </AnimatedCircularProgress>
      )}
    </View>
  )
}

export default Rating
