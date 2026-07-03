import { FlatList, Text, View } from "react-native"
import { useState } from "react"

import ProductCard from "../ui/ProductCard"
import data from "../../mocks/products.json"
export default function ProductsList({ search = "" }) {
    const [products] = useState(data)
    return (
        <View className="z-0 bg-stone-50 dark:bg-surface flex-1 justify-start items-center">
            <View className="z-0 bg-stone-50 dark:bg-surface flex-1 justify-start items-center">
                <Text className="color-slate-50 my-5" >Catalogo</Text>
                <Text className="color-slate-50 my-5">
                    Siluetas escultóricas y materiales orgánicos
                    para el santuario moderno. Experimenta el
                    diseño en tu espacio.
                </Text>
            </View>
            <FlatList
                data={products}
                scrollEnabled={false}
                keyExtractor={(item) => item.model}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ gap: 16 }}
                renderItem={({ item }) => {
                    const topVariation = item.variations.find(v => v.top)
                    return (
                        <ProductCard item={item} topVariation={topVariation}/>
                    )
                }}
            />
        </View>
    )
}