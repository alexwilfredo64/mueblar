import { Text } from 'react-native'

/**
 * Etiqueta en mayúsculas con tracking amplio que precede a cada campo,
 * tal como en los mockups ("NOMBRE COMPLETO", "CORREO ELECTRÓNICO", ...).
 */
export default function FieldLabel({ children, className = '' }) {
  return (
    <Text
      className={`mb-2 text-xs font-semibold uppercase tracking-[2px] text-copper dark:text-stone-400 ${className}`}
    >
      {children}
    </Text>
  )
}
