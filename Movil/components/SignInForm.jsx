import { View, Text, Pressable, TextInput } from 'react-native'
import { useState } from 'react'
import { EyeIcon, EyeSlashedIcon } from './Icons'

export default function SignInForm() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [hidden, setHidden] = useState(true);
    const [password, setPassword] = useState("");
    const [passwordConfirm, setpasswordConfirm] = useState("");

    return (
    <View className="items-center w-full p-10 gap-10 flex-1 bg-slate-700">
        <Text> MueblAR</Text>
        <Text> Comienza tu Colección</Text>
        <Text> Crea una cuenta para guardar piezas deseadas y verlas en AR.</Text>
        
        <View>
            <Text className="">Nombre</Text>
            <View className="w-full flex-row items-center border-b-2 border-b-white  text-white">
                <TextInput
                    onChangeText={setName}
                    value={name}
                    className="flex-1 px-3"
                />
            </View>
        </View>
        
        <View>
            <Text className="">Apellido</Text>
            <View className="w-full flex-row items-center border-b-2 border-b-white  text-white">
                <TextInput
                    onChangeText={setLastName}
                    value={lastName}
                    className="flex-1 px-3"
                />
            </View>
        </View>
        
        <View>
            <Text className="">Contraseña</Text>
            <View className="w-full flex-row items-center border-b-2 border-b-white  text-white">
                <TextInput
                    secureTextEntry={hidden}
                    onChangeText={setPassword}
                    value={password}
                    className="flex-1 px-3"
                    placeholder='*************'
                />
                <Pressable
                    onPress={ () => setHidden(prev => !prev)}
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

        <View>
            <Text className="">Confirmar</Text>
            <View className="w-full flex-row items-center border-b-2 border-b-white  text-white">
                <TextInput
                    secureTextEntry={hidden}
                    onChangeText={setpasswordConfirm}
                    value={passwordConfirm}
                    className="flex-1 px-3"
                    placeholder='*************'
                />
                <Pressable
                    onPress={ () => setHidden(prev => !prev)}
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
        
    </View>
    )
}