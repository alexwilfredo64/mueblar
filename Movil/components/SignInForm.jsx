import { View, Text, Pressable, TextInput } from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

import PasswordInput from './PasswordInput'
import { registerUser, loginUser } from '../services/authService'

export default function SignInForm() {
    const router = useRouter()
    const [ requestError, setRequestError ] = useState(null)
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            email: ""
        }
    })

    const onSubmit = async ({name, lastName, email, password}) => {
        
        setRequestError(null)
        
        try {
            await registerUser(name, lastName, email, password)
            await loginUser(email, password)
            router.navigate("/(main)/home")
        } catch (err) {
            const status = err.status
            if (status === 409) setRequestError({ server: 'Ya existe una cuenta con ese correo.' })
            else if (status === 400) setRequestError({ server: 'Revisá los datos ingresados e intentá de nuevo.' })
            else if (status === 403) setRequestError({ server: 'No tenés permisos para registrarte.' })
            else if (status >= 500) setRequestError({ server: 'Error del servidor. Intentá de nuevo más tarde.' })
            else setRequestError({ server: err.message || 'Error al crear la cuenta.' })
        }
    }

    return (
    <View className="items-center w-full p-10 gap-10 flex-1">
        <Text> MueblAR</Text>
        <Text> Comienza tu Colección</Text>
        <Text> Crea una cuenta para guardar piezas deseadas y verlas en AR.</Text>
        
        <View>
            <Text className="">Nombre</Text>
            <View className="w-full flex-row items-center border-b-2 border-b-white  text-white">
                <Controller
                    name="name"
                    control={control}
                    rules={{
                        required: "El nombre es obligatorio.",
                        pattern: {
                            value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/,
                            message: "El nombre solo puede contener letras y espacios."
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            onChangeText={(text) => {
                                onChange(text)
                                if (!requestError) setRequestError(null)
                            }}
                            onBlur={onBlur}
                            value={value}
                            className="flex-1 px-3"
                        />
                    )}
                />
                {errors.name && <Text className="text-red-600 mt-2">{errors.name.message}</Text>}
            </View>
        </View>
        <View>
            <Text className="">Apellido</Text>
            <View className="w-full flex-row items-center border-b-2 border-b-white  text-white">
                <Controller
                    control={control}
                    name="lastName"
                    rules={{
                        required: "El nombre es obligatorio.",
                        pattern: {
                            value: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/,
                            message: "El nombre solo puede contener letras y espacios."
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            onChangeText={(text) => {
                                onChange(text)
                                if (!requestError) setRequestError(null)
                            }}
                            value={value}
                            className="flex-1 px-3"
                        />
                    )}
                />
                {errors.lastName && <Text className="text-red-600 mt-2">{errors.lastName.message}</Text>}
            </View>
        </View>
        <View>
            <Text className="">Correo Electrónico</Text>
            <View className="w-full flex-row items-center border-b-2 border-b-white  text-white">
                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: "El correo es obligatorio.",
                        pattern: {
                            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                            message: "Ingresa un correo válido."
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            onChangeText={(text) => {
                                onChange(text)
                                if (!requestError) setRequestError(null)
                            }}
                            onBlur={onBlur}
                            value={value}
                            className="flex-1 px-3"
                        />
                    )}
                />
                {errors.email && <Text className="text-red-600 mt-2">{errors.ema.message}</Text>}
            </View>
        </View>
        <Controller
            name="password"
            control={control}
            rules={{
                required: "La contraseña es obligatoria.",
                minLength: {
                    value: 8,
                    message: "Debe tener al menos 8 caracteres."
                },
                validate: value => {
                    if (!/[A-Z]/.test(value)) 
                        return  "Debe incluir al menos una letra mayúscula."
                    if (!/[a-z]/.test(value)) 
                        return  "Debe incluir al menos una letra minúscula."
                    if (!/[0-9]/.test(value)) 
                        return  "Debe incluir al menos un número."
                    if (!/[^A-Za-z0-9]/.test(value)) 
                        return "Debe incluir al menos un carácter especial (ej: @, #, $, !)."
                    return true
                }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <PasswordInput 
                    title={"Contraseña"} 
                    onChangetext={(text) => {
                        onChange(text)
                        if (!requestError) setRequestError(null)
                    }}
                    onBlur={onBlur}
                    value={value} 
                />

            )}
        />
        {errors.password && <Text className="text-red-600 mt-2">{errors.password.message}</Text>}
        <Controller
            name="confirmPassword"
            control={control}
            rules={{
                required: "Confirmar la contraseña es obligatoria.",
                validate: (val, formValues) =>   val === formValues.confirmPassword || "Las contraseñas no coinciden" 
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <PasswordInput 
                    title={"Confirmar"} 
                    onChangetext={(text) => {
                        onChange(text)
                        if (!requestError) setRequestError(null)
                    }}
                    onBlur={onBlur} 
                    value={value}
                />
            )}
        />
        {errors.confirmPassword && <Text className="text-red-600 mt-2">{errors.confirmPassword.message}</Text>}
        {requestError && <Text className="text-red-600 mt-2">{requestError}</Text>}
        
        <Pressable
            onPress={ handleSubmit(onSubmit) }
            className="bg-amber-600 flex-row items-center justify-center h-20 w-full active:opacity-60"
        >
            <Text> REGISTRARSE</Text>
        </Pressable>
    </View>
    )
}