import "../global.css"

import { Slot, useRouter } from 'expo-router'
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useEffect, useState } from 'react'

export default function RootLayout() {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const router = useRouter()
    
    if(isAuthenticated)
        setIsAuthenticated(false)
    
    useEffect(() => {
        if(isAuthenticated){
            router.replace("(main)/home")
        } else {
            router.replace("(auth)/register")
        }
    }, [isAuthenticated, router])
    
    return (
        <SafeAreaProvider>
            <Slot />
        </SafeAreaProvider>
    )
}