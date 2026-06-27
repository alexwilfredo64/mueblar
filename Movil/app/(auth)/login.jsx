import { View, Text } from "react-native"
import { Link } from "expo-router"

export default function Login () {
    return (
        <View className="flex-1 bg-slate-600 items-center justify-center">
            <Text> Login </Text>
            <Link href="/register"> Registrarse</Link>
        </View>
    )
}