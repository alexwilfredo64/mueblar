import { Text } from 'react-native'

import { FONT_SERIF } from '../../constants/theme'

/**
 * Texto con la tipografía serif de la marca. Se usa para titulares
 * ("MueblAR", "Comienza tu Colección", "Recupera tu Acceso").
 */
export default function SerifText({ className, style, children, ...props }) {
  return (
    <Text className={className} style={[{ fontFamily: FONT_SERIF }, style]} {...props}>
      {children}
    </Text>
  )
}
