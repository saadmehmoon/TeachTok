import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

type Props = {
  answer: string;
  correct?: boolean;
  wrong?: boolean;
};

export default function AnswerBox({ answer, correct, wrong }: Props) {
  return (
    <View
      style={{
        borderRadius: 8,
        backgroundColor: correct ? "rgba(40, 177, 143, 0.70)" : wrong ? "rgba(220, 95, 95, 0.70)" : "rgba(255, 255, 255, 0.50)",
        flexDirection: "row",
        minHeight: 50,
        paddingLeft: 10,
        paddingRight: 5,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          flex: 1,
          fontSize: 22,
          fontWeight: "500",
          paddingTop: 5,
          paddingBottom: 5,
          color: Colors.dark.text
        }}
      >
        {answer}
      </Text>
      {(correct || wrong) && (
        <Image
          style={{
            width: 50,
            height: 50,
            justifyContent: "flex-end",
            transform: [
              {
                scaleX: -1,
              },
              {
                scaleY: wrong ? -1 : 1,
              },
            ],
          }}
          source={correct ? require("../assets/images/thumbs-up.gif") : wrong ? require("../assets/images/thumbs-down.gif") : {}}
        />
      )}
    </View>
  );
}
