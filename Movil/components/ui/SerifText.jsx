import { Text } from 'react-native'

import { FONT_SERIF } from '../../constants/theme'

export default function SerifText({ className, style, children, ...props }) {
  return (
    <Text className={className} style={[{ fontFamily: FONT_SERIF }, style]} {...props}>
      {children}
    </Text>
  )
}
