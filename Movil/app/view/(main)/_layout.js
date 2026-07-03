import { Stack } from "expo-router"

export default function MainLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="catalog" options={{ title: 'Inicio' }} />
        </Stack>
    )
}