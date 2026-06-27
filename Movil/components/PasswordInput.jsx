import { View, Text, TextInput, Pressable } from 'react-native'
import {useState} from 'react'
import { EyeIcon, EyeSlashedIcon } from './Icons'


export default function PasswordInput({ title, value, onChangetext }) {
    const [hidden, toggleHidden] = useState(true)
    
    return (
        <View>
            <Text className="">{title}</Text>
            <View className="w-full flex-row items-center border-b-2 border-b-white  text-white">
                <TextInput
                    secureTextEntry={hidden}
                    onChangeText={onChangetext}
                    value={value}
                    className="flex-1 px-3"
                    placeholder='*************'
                />
                <Pressable
                    onPress={ () => toggleHidden(prev => !prev)}
                    className="w-12 justify-center px-2 active:opacity-50"
                >
                    {
                        hidden
                        ? <EyeIcon />
                        : <EyeSlashedIcon />
                    }
                </Pressable>
            </View>
        </View>
    )
}