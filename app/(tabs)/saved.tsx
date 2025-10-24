import { icons } from '@/constants/icons'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const saved = () => {
  return (
    <View className='bg-primary flex-1 px-10'>
          <View className='flex justify-center items-center flex-1 flex-col gap-5'>
            <Image source={icons.save} className='size=10' tintColor='#fff'/>
            <Text className='text-gray-500 text-base'>saved</Text>
    
          </View>
        </View>
  )
}

export default saved

const styles = StyleSheet.create({})