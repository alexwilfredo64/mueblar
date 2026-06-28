import { useState } from 'react'
import { Animated, Pressable } from 'react-native'

import { useTheme } from '../../context/ThemeContext'
import { SunIcon, MoonIcon } from '../Icons'

/**
 * Botón para alternar entre modo claro y oscuro. Aplica un giro sutil al
 * cambiar (Animated nativo) y delega la persistencia en ThemeContext.
 */
export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme()
  const [spin] = useState(() => new Animated.Value(0))

  const onPress = () => {
    spin.setValue(0)
    Animated.timing(spin, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start()
    toggleTheme()
  }

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  return (
    <Pressable onPress={onPress} hitSlop={10} className={`p-1 active:opacity-60 ${className}`}>
      <Animated.View style={{ transform: [{ rotate }] }}>
        {isDark ? <SunIcon /> : <MoonIcon />}
      </Animated.View>
    </Pressable>
  )
}
