import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

import { COLORS } from '../constants/theme'

/**
 * Wrappers de íconos centralizados. Aceptan `color`/`size` por props para que
 * cada vista los tematice (claro/oscuro) sin duplicar nombres de FontAwesome.
 */
export const EyeIcon = ({ size = 20, color = COLORS.iconMuted, ...props }) => (
  <FontAwesome6 name="eye" size={size} color={color} {...props} />
)

export const EyeSlashedIcon = ({ size = 20, color = COLORS.iconMuted, ...props }) => (
  <FontAwesome6 name="eye-slash" size={size} color={color} {...props} />
)

export const CheckIcon = ({ size = 12, color = '#ffffff', ...props }) => (
  <FontAwesome6 name="check" size={size} color={color} {...props} />
)

export const SunIcon = ({ size = 20, color = COLORS.copper, ...props }) => (
  <FontAwesome6 name="sun" size={size} color={color} {...props} />
)

export const MoonIcon = ({ size = 18, color = COLORS.copper, ...props }) => (
  <FontAwesome6 name="moon" size={size} color={color} {...props} />
)

export const ArrowLeftIcon = ({ size = 18, color = COLORS.copper, ...props }) => (
  <FontAwesome6 name="arrow-left" size={size} color={color} {...props} />
)

export const ChevronDownIcon = ({ size = 14, color = COLORS.iconMuted, ...props }) => (
  <FontAwesome6 name="chevron-down" size={size} color={color} {...props} />
)

export const ShieldKeyIcon = ({ size = 20, color = COLORS.copper, ...props }) => (
  <FontAwesome6 name="shield-halved" size={size} color={color} {...props} />
)
