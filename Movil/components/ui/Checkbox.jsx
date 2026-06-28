import { useState } from 'react'
import { Animated, Pressable, View } from 'react-native'

import { CheckIcon } from '../Icons'

export default function Checkbox({ checked, onChange }) {
  
  const [scale] = useState(() => new Animated.Value(checked ? 1 : 0))

  const toggle = () => {
    const next = !checked
    Animated.spring(scale, {
      toValue: next ? 1 : 0,
      useNativeDriver: true,
      speed: 50,
      bounciness: 8,
    }).start()
    onChange?.(next)
  }

  return (
    <Pressable onPress={toggle} hitSlop={8} className="active:opacity-70">
      <View
        className={`h-5 w-5 items-center justify-center rounded ${
          checked ? 'bg-copper' : 'border border-stone-400 dark:border-stone-600'
        }`}
      >
        <Animated.View style={{ transform: [{ scale }], opacity: scale }}>
          <CheckIcon />
        </Animated.View>
      </View>
    </Pressable>
  )
}
