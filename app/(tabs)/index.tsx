import { ActivityIndicator, Dimensions, Image, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

import axios from "axios";
import { Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import AnswerBox from "../../components/AnswerBox";
import BottomBar from "../../components/BottomBar";
import ActionBarItem from "../../components/ActionBarItem";
import HeartIcon from "../../assets/icons/heart.svg";
import CommentsIcon from "../../assets/icons/comments.svg";
import BookmarkIcon from "../../assets/icons/bookmark.svg";
import ShareIcon from "../../assets/icons/share.svg";

const NO_WIDTH_SPACE = "";

const highlight = (str: string) =>
  str.split(" ").map((word, i) => (
    <Text key={i}>
      <Text style={styles.highlighted}>{word} </Text>
      {NO_WIDTH_SPACE}
    </Text>
  ));

type Data = {
  type: string;
  uid: number;
  id: number;
  playlist: string;
  description: string;
  image: string;
  question: string;
  correctOptions: string[];
  selected: boolean;
  options: [
    {
      id: string;
      answer: string;
      correct: boolean;
      wrong: boolean;
    },
    {
      id: string;
      answer: string;
      correct: boolean;
      wrong: boolean;
    },
    {
      id: string;
      answer: string;
      correct: boolean;
      wrong: boolean;
    }
  ];
  user: {
    name: string;
    avatar: string;
  };
};

export default function TabOneScreen() {
  const [data, setData] = useState<Data[]>([]);
  const [uid, setUid] = useState<number>(0);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    if (initialLoad) {
      load(3).then(() => setInitialLoad(false));
    }
  }, []);

  const load = async (num: number) => {
    const newData: Data[] = [];
    for (let i = 0; i < num; i++) {
      try {
        const { data: resData } = await axios.get("https://cross-platform.rp.devfactory.com/for_you");
        const { data: answerData } = await axios.get(`https://cross-platform.rp.devfactory.com/reveal?id=${resData.id}`);
        const correctOptions = answerData.correct_options.map((option: any) => option.id);
        const modifiedData = {
          ...resData,
          options: resData.options.map((option: any) => ({ ...option, correct: false, wrong: false })),
          correctOptions,
          selected: false,
          uid: uid + i,
        };
        newData.push(modifiedData);
      } catch (e) {
        console.log(e);
        return;
      }
    }
    setData((data) => [...data, ...newData]);
    setUid((uid) => uid + num);
  };

  async function handleAnswerClicked(questionId: number, answerId: string) {
    const newData = data.map((item) => {
      if (item.uid !== questionId) return item;
      if (item.correctOptions.includes(answerId)) {
        return { ...item, options: item.options.map((option) => ({ ...option, correct: option.id === answerId, wrong: false })), selected: true };
      } else {
        return {
          ...item,
          options: item.options.map((option) => ({ ...option, correct: item.correctOptions.includes(option.id), wrong: option.id === answerId })),
          selected: true,
        };
      }
    });
    setData(newData as Data[]);
  }

  if (initialLoad) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 10 }}>
        <ActivityIndicator size="small" color="#fff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{
          width: "100%",
        }}
        data={data}
        renderItem={({ item }) => (
          <ImageBackground source={{ uri: item.image }} style={styles.backgroundImage}>
            <View
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                height: "100%",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <View style={{ flexDirection: "row", backgroundColor: "transparent", marginTop: "50%", marginBottom: 20 }}>
                <View
                  style={{ backgroundColor: "transparent", flex: 6, marginHorizontal: 16, flexDirection: "column", justifyContent: "space-between" }}
                >
                  <Text
                    style={{
                      padding: 6,
                      gap: 10,
                      fontSize: 28,
                      fontStyle: "normal",
                      fontWeight: "500",
                    }}
                  >
                    {highlight(item.question)}
                  </Text>
                  <View
                    style={{
                      backgroundColor: "transparent",
                      gap: 7,
                      justifyContent: "flex-end",
                    }}
                  >
                    {item.options.map(({ answer, correct, wrong, id }) => (
                      <TouchableOpacity
                        style={{ backgroundColor: "transparent" }}
                        onPress={() => handleAnswerClicked(item.uid, id)}
                        disabled={item.selected}
                        key={id}
                      >
                        <AnswerBox answer={answer} correct={correct} wrong={wrong} />
                      </TouchableOpacity>
                    ))}
                    <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", alignSelf: "auto", marginTop: 10 }}>{item.user.name}</Text>
                    <Text style={{}}>{item.description}</Text>
                  </View>
                </View>
                <View style={{ flex: 1, height: "100%", backgroundColor: "transparent", gap: 15, justifyContent: "flex-end" }}>
                  <Image
                    source={{ uri: item.user.avatar }}
                    style={{ width: 45, height: 45, borderRadius: 25, alignSelf: "center", borderColor: "white", borderWidth: 1 }}
                  />
                  <ActionBarItem Icon={HeartIcon} text={"87"} />
                  <ActionBarItem Icon={CommentsIcon} text={"2"} />
                  <ActionBarItem Icon={BookmarkIcon} text={"203"} />
                  <ActionBarItem Icon={ShareIcon} text={"17"} />
                </View>
              </View>
              <BottomBar unit={item.description} playlist={item.playlist} />
            </View>
          </ImageBackground>
        )}
        pagingEnabled
        keyExtractor={(item) => item.uid.toString()}
        snapToInterval={Dimensions.get("window").height - 79}
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onEndReached={() => load(2)}
        onEndReachedThreshold={1.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    width: "100%",
    height: Dimensions.get("window").height - 79,
    justifyContent: "flex-end",
  },
  highlighted: {
    padding: 2,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
});
