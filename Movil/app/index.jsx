import { ActivityIndicator, View } from 'react-native';

export default function Index() {
    return (
        <View className="flex-1 items-center justify-center bg-slate-900">
            <ActivityIndicator size="large" color="#4f46e5" />
        </View>
    );
}