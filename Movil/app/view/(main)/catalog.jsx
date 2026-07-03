import { View, Text, Pressable, TextInput, Image, FlatList, ScrollView} from "react-native"
import { useState } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import MainScreen from "../../../components/main/MainScreen"
import categories from "../../../mocks/categories.json"
import ProductsList from "../../../components/main/ProductsList"
import { SearchIcon } from "../../../components/Icons"
import { useTheme } from "../../../context/ThemeContext"
import { COLORS } from "../../../constants/theme"

export default function Catalog() {
    const [ search, setSearch ] = useState("")
    const [ showSearchModal, toggleSearchModal] = useState(true)
    const insets = useSafeAreaInsets()
    const { isDark } = useTheme()

    return (

        <>
        { showSearchModal 
        ?
        <View 
            onBlur={() => toggleSearchModal(false)}
            className="z-30 absolute bg-slate-400 w-[75%] px-8 rounded-tr-[2rem] rounded-br-[2rem]"
            style={{
                paddingTop: insets.top + 12,
                top: 0,
                bottom: insets.bottom
            }}
        >

            <Text 
                className="text-stone-900 stone- dark:text-stone-100 font-bold text-4xl mb-4"
            >
                    Filtrar Cátalogo
            </Text>
            <View
                className="flex-row items-center border-2 dark:border-stone-100 border-stone-700 px-3 mb-3"
            >
                <SearchIcon color={isDark ? COLORS.stone100 : COLORS.stone900}/>
                <TextInput
                    onChangeText={setSearch}
                    value={search}
                />
            </View>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: 24
                }}
            >

                <Text 
                    className="text-stone-900 stone- dark:text-stone-100 text-sm font-semibold uppercase tracking-[2px]"
                >
                    Categorías
                </Text>
                <View className="">
                    {
                        categories.map( c => (
                            <Pressable 
                                key={c.id}
                            >
                                <Text 
                                    className="text-stone-900 stone- dark:text-stone-100"
                                >
                                    {c.name}
                                </Text>
                            </Pressable>
                        ))
                    }

                </View>
            </ScrollView>

        </View>
        :null}
        <MainScreen 
            showBrand 
            showProfile 
            showSearch
            onSearchPress={() => toggleSearchModal(true)}
        >
            <ProductsList search={search} />
        </MainScreen>
        </>
    )
}