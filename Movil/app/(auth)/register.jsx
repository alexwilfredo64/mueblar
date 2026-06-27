import SignInForm from '../../components/SignInForm'
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
export default function Register() {
    const insets = useSafeAreaInsets()
    return (
        <View className="flex-1 h-full bg-slate-700" style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
            <SignInForm />

            <View className="flex-row span justify-center">
                <Text className="mr-2">¿Ya tienes cuenta?</Text>
                <Link href="/login" className='text-blue-500'>
                    Inicia Sesión
                </Link>
            </View>
        </View>
    )
}