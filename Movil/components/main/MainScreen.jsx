import { KeyboardAvoidingView, Pressable, ScrollView, Text, View, Platform, Animated } from "react-native";

import { useFadeIn } from "../../hooks/useFadeIn";
import { ArrowLeftIcon, SearchIcon } from "../Icons";
import Brand from "../ui/Brand";
import { Link } from "expo-router";
export default function MainScreen({
    children,
    showBack = false,
    backLabel,
    showBrand = false,
    showSearch = false,
    onSearchPress,
    showProfile = false,
    contentClassName = ""
}) {
    const fade = useFadeIn()
    const hasTopBar = showBack || showBrand || showProfile || showSearch
    return (
        <KeyboardAvoidingView>
            <ScrollView>
                { hasTopBar
                ? ( 
                <View>
                    { showBack
                    ? ( 
                    <Pressable>
                        <ArrowLeftIcon />
                        { backLabel ? <Text>{backLabel}</Text> : null }
                    </Pressable>)
                    : null}
                    { showSearch
                    ? (
                    <Pressable>
                        <SearchIcon />
                    </Pressable>
                    )
                : null}

                    <View>{showBrand ? <Brand /> : null}</View>
                    <View className="flex-1 items-end">
                        {showProfile
                        ? (
                            <Link>
                                <Text >Profile</Text>
                            </Link>
                        ) 
                        : null}
                    </View>
                </View>)
                : null}
                <Animated.View style={[fade, { flex: 1 }]}>
                    <View className={`flex-1 items-end ${contentClassName}`}>{children}</View>
                </Animated.View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}