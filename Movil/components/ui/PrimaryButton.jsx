import { useState } from 'react'
import { Animated, Pressable, Text, ActivityIndicator } from 'react-native'

/**
 * Variantes:
 *  - "solid"   → relleno cobre (acción primaria, ej. REGISTRARSE).
 *  - "outline" → solo borde (acción secundaria, ej. CANCELAR).
 */
export default function PrimaryButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  variant = 'solid',
  className = '',
}) {
  const [scale] = useState(() => new Animated.Value(1))
  const isDisabled = disabled || loading

  const animateTo = (toValue) =>
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start()

  const isSolid = variant === 'solid'
  const containerBase = isSolid
    ? 'bg-copper shadow-lg shadow-copper/40'
    : 'border border-stone-300 dark:border-stone-700'
  const textColor = isSolid ? 'text-white' : 'text-stone-500 dark:text-stone-300'

  return (
    <Animated.View style={{ transform: [{ scale }], width: '100%' }}>
      <Pressable
        onPress={onPress}
        onPressIn={() => animateTo(0.97)}
        onPressOut={() => animateTo(1)}
        disabled={isDisabled}
        className={`h-16 w-full flex-row items-center justify-center rounded-full ${containerBase} ${
          isDisabled ? 'opacity-50' : ''
        } ${className}`}
      >
        {loading ? (
          <ActivityIndicator color={isSolid ? '#ffffff' : '#b5745a'} />
        ) : (
          <Text className={`text-sm font-semibold uppercase tracking-[2px] ${textColor}`}>
            {label}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  )
}
