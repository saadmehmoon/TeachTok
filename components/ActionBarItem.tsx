import React, { SVGProps } from "react";
import { Text } from "react-native";
import { View } from "./Themed";
import Colors from "../constants/Colors";

export default function ActionBarItem({ Icon, text }: { Icon: React.FC; text: string }) {
  return (
    <View style={{ backgroundColor: "transparent", alignItems: "center" }}>
      <Icon />
      <Text style={{ color: Colors.dark.text }}>{text}</Text>
    </View>
  );
}
