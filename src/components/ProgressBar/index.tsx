import { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { styles } from './styles'

interface Props {
  total: number
  current: number
}

export function ProgressBar({ total, current }: Props) {
  const progress = Math.round((current / total) * 100)

  const sharedProgress = useSharedValue(progress)

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`,
    }
  })

  useEffect(() => {
    sharedProgress.value = withTiming(progress)
  }, [progress, sharedProgress])

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.progress, animatedProgressStyle]} />
    </View>
  )
}
