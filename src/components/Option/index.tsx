import { useEffect } from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import {
  Canvas,
  Path,
  Skia,
  useValue,
  runTiming,
  BlurMask,
  Circle,
  Easing,
} from '@shopify/react-native-skia'

import { styles } from './styles'
import { THEME } from '../../styles/theme'

type Props = TouchableOpacityProps & {
  checked: boolean
  title: string
}

const CHECK_SIZE = 28
const CHECK_STROKE = 2
const RADIUS = (CHECK_SIZE - CHECK_STROKE) / 2
const CENTERED_CIRCLE_RADIUS = RADIUS / 2

export function Option({ checked, title, ...rest }: Props) {
  const percentage = useValue(0)
  const circle = useValue(0)

  const path = Skia.Path.Make()
  path.addCircle(CHECK_SIZE, CHECK_SIZE, RADIUS)

  useEffect(() => {
    if (checked) {
      runTiming(percentage, 1, { duration: 700 })
      runTiming(circle, CENTERED_CIRCLE_RADIUS, { easing: Easing.bounce })
      return
    }

    runTiming(percentage, 0, { duration: 700 })
    runTiming(circle, 0, { duration: 300 })
  }, [checked, percentage, circle])

  return (
    <TouchableOpacity
      style={[styles.container, checked && styles.checked]}
      {...rest}
    >
      <Text style={styles.title}>{title}</Text>

      <Canvas style={{ height: CHECK_SIZE * 2, width: CHECK_SIZE * 2 }}>
        <Path
          path={path}
          color={THEME.COLORS.GREY_500}
          style="stroke"
          strokeWidth={CHECK_STROKE}
        />

        <Path
          path={path}
          color={THEME.COLORS.BRAND_LIGHT}
          style="stroke"
          strokeWidth={CHECK_STROKE}
          start={0}
          end={percentage}
        >
          <BlurMask blur={1} style="solid" />
        </Path>

        <Circle
          cx={CHECK_SIZE}
          cy={CHECK_SIZE}
          r={circle}
          color={THEME.COLORS.BRAND_LIGHT}
        >
          <BlurMask blur={4} style="solid" />
        </Circle>
      </Canvas>
    </TouchableOpacity>
  )
}
