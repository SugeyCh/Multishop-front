import { View, Text, Image } from 'react-native'
import React from 'react'

const ImagenHeader = () => {
  return (
    <Image
      source={require('../assets/MultilogoPNGR.png')}
      style={{ width: 180, height: 70, marginLeft: -43, marginBottom: -27, resizeMode: 'contain' }}
    />
  )
}

export default ImagenHeader