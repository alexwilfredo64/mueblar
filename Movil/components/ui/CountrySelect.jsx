import { useState } from 'react'
import { View, Text, Pressable, Modal, FlatList } from 'react-native'

import { COUNTRIES } from '../../constants/countries'
import FieldLabel from './FieldLabel'
import { ChevronDownIcon } from '../Icons'

export default function CountrySelect({ label = 'País', value, onChange }) {
  const [open, setOpen] = useState(false)

  const select = (country) => {
    onChange?.(country)
    setOpen(false)
  }

  return (
    <View className="w-full">
      {label ? <FieldLabel>{label}</FieldLabel> : null}

      <Pressable
        onPress={() => setOpen(true)}
        className="flex-row items-center justify-between rounded-xl bg-stone-200/70 px-4 py-4 active:opacity-80 dark:bg-stone-800/70"
      >
        <Text className="text-base text-stone-800 dark:text-stone-100">{value}</Text>
        <ChevronDownIcon />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable
          onPress={() => setOpen(false)}
          className="flex-1 justify-end bg-black/50"
        >
          <Pressable className="max-h-[60%] rounded-t-3xl bg-white px-5 pb-8 pt-5 dark:bg-card">
            <Text className="mb-4 text-center text-xs font-semibold uppercase tracking-[2px] text-copper">
              Selecciona tu país
            </Text>
            <FlatList
              data={COUNTRIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const active = item === value
                return (
                  <Pressable
                    onPress={() => select(item)}
                    className="flex-row items-center justify-between border-b border-stone-100 py-4 active:opacity-70 dark:border-stone-800"
                  >
                    <Text
                      className={`text-base ${
                        active
                          ? 'font-semibold text-copper'
                          : 'text-stone-700 dark:text-stone-200'
                      }`}
                    >
                      {item}
                    </Text>
                  </Pressable>
                )
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  )
}
