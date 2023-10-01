import { View, Text } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

const Activity = () => {
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
        Activity - Under Construction 🚧
      </Text>
    </View>
  );
};

export default Activity;
