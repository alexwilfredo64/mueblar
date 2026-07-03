import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"

import MainScreen from "../../../../components/main/MainScreen"

export default function ProductDetails () {
    const { model } = useLocalSearchParams()

    return (
        <MainScreen 
            showBack 
            backLabel="Atrás"
            showProfile 
            contentClassName="justify-center"
        >
            <View className="flex-1 justify-center items-center ">
                <Text className="color-copper-light">
                    {model}
                </Text>
            </View>
        </MainScreen>
    )
}