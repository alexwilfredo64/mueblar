import SerifText from './SerifText'

export default function Brand({ size = 'text-xl', className = '' }) {
  return (
    <SerifText className={`font-bold text-stone-900 dark:text-stone-50 ${size} ${className}`}>
      MueblAR
    </SerifText>
  )
}
