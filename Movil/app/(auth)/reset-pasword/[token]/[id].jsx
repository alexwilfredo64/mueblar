import { useLocalSearchParams } from 'expo-router'
import { View, TextInput } from 'react-native'
import { useState } from 'react'

import AuthScreen from '../../../../components/auth/AuthScreen'

export default function Reset() {
    const { token, id } = useLocalSearchParams() 
    const [p1, setP1] =useState("")
    const [p2, setP2] =useState("")
    return (
        <AuthScreen>
            <View className="flex-1 ">
                <TextInput
                    onChangeText={setP1}
                    value={p1}
                    className="border border-b-slate-50 flex-row my-5"
                />
                <TextInput
                    onChangeText={setP2}
                    value={p2}
                    className="border border-b-slate-50 flex-row"
                />
            </View>
        </AuthScreen>
    )
}