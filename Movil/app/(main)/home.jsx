import { View, Text, Pressable, TextInput} from "react-native"
import { useState } from "react"
import { logoutUser } from "../../services/authService"
import { useRouter } from "expo-router"
export default function Home() {
    const [ p1, setP1 ] = useState("")
    const router = useRouter()
    return (
        <View className="bg-black flex-1 justify-center items-center">
            <Text className="color-slate-50 my-5" >Home</Text>
            <TextInput
                    onChangeText={setP1}
                    value={p1}
                    className="border border-b-slate-50 flex-row w-full text-white my-10"
                />
            <Pressable className="w-20 aspect-square bg-white my-5" onPress={() => {
                logoutUser()
                router.navigate('/(auth)/login')
            }}>
            </Pressable>
            <Pressable className="w-20 aspect-square bg-red-800" onPress={() => {
                router.navigate(`/(auth)${p1}`)
            }}>
            </Pressable>
        </View>
    )
}