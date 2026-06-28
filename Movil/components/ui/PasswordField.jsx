import { useState } from 'react'
import { View, TextInput, Text, Pressable } from 'react-native'

import { COLORS } from '../../constants/theme'
import { EyeIcon, EyeSlashedIcon } from '../Icons'
import FieldLabel from './FieldLabel'

/**
 * Campo de contraseña con etiqueta, subrayado y botón de mostrar/ocultar.
 * El único estado interno es la visibilidad del texto; el valor lo controla
 * react-hook-form desde afuera.
 */
export default function PasswordField({
  label,
  error,
  value,
  onChangeText,
  onBlur,
  placeholder = '••••••••',
}) {
  const [hidden, setHidden] = useState(true)

  return (
    <View className="w-full">
      {label ? <FieldLabel>{label}</FieldLabel> : null}
      <View className="flex-row items-center border-b border-stone-300 dark:border-stone-700">
        <TextInput
          secureTextEntry={hidden}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor={COLORS.placeholder}
          className="flex-1 pb-2 text-base text-stone-900 dark:text-stone-100"
        />
        <Pressable
          onPress={() => setHidden((prev) => !prev)}
          hitSlop={12}
          className="pb-2 pl-3 active:opacity-50"
        >
          {hidden ? <EyeIcon /> : <EyeSlashedIcon />}
        </Pressable>
      </View>
      {error ? <Text className="mt-1.5 text-xs text-red-500">{error}</Text> : null}
      {/* {<Text className="mt-1.5 text-xs text-red-500">{error}</Text> } */}
    </View>
  )
}
