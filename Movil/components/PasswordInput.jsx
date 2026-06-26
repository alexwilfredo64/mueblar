import { View, Text, TextInput, Pressable } from 'react-native'

import { EyeIcon, EyeSlashedIcon } from './Icons'


export default function PasswordInput({
    hidden,
    toggleHidden,
    password,
    onChangeText,
    placeholder,
    textInputClass = "",
    inputContainerClass = "",
    toggleIconClass
}) {
    return (
        <View>
            <Text className={``}>Contraseña</Text>
            <View className={inputContainerClass}>
                <TextInput
                    secureTextEntry={hidden}
                    onChangeText={onChangeText}
                    value={password}
                    className={textInputClass}
                    placeholder={placeholder}
                />
                <Pressable
                    onPress={ toggleHidden}
                    className={toggleIconClass}
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