import { View, Text, Pressable, TextInput} from "react-native"
import { useState } from "react"
import { useRouter } from "expo-router"

import { logoutUser } from "../../../services/authService"
import MainScreen from "../../../components/main/MainScreen"

export default function Catalog() {
    const [ p1, setP1 ] = useState("")
    const router = useRouter()
    return (
        <MainScreen>
            <View className="bg-black flex-1 justify-center items-center">
                <Text className="color-slate-50 my-5" >Catalog</Text>
                <TextInput
                        onChangeText={setP1}
                        value={p1}
                        className="border border-b-slate-50 flex-row w-full text-white my-10"
                    />
                <Pressable className="w-20 aspect-square bg-white my-5" onPress={() => {
                    logoutUser()
                    router.navigate('/view/login')
                }}>
                </Pressable>
                <Pressable className="w-20 aspect-square bg-red-800" onPress={() => {
                    router.navigate(`/view/login`)
                }}>
                </Pressable>
            </View>
        </MainScreen>
    )
}