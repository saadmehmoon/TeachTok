import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

const Profile = () => {
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          marginTop: 300,
          fontSize: 20,
          fontWeight: "bold",
          color: Colors.dark.text,
        }}
      >
        Profile - Under Construction 🚧
      </Text>
    </View>
  )
}

export default Profile