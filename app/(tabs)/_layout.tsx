import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import { View, Text } from "../../components/Themed";
import { useEffect, useRef, useState } from "react";

function TabBarIcon(props: { name: React.ComponentProps<typeof MaterialIcons>["name"]; color: string }) {
  return <MaterialIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const startDate = useRef(new Date());
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(new Date().getTime() - startDate.current.getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  function convertTimeToString(ms: number) {
    if (Math.floor(ms / 1000 / 60) <= 0) {
      return Math.floor(ms / 1000) + "s";
    } else if (Math.floor(ms / 1000 / 60 / 60) <= 0) {
      return Math.floor(ms / 1000 / 60) + "m";
    }
    return Math.floor(ms / 1000 / 60 / 60) + "h";
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTransparent: true,
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "transparent" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>For You</Text>
            </View>
          ),
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => <Ionicons name="search" size={22} color={Colors.dark.text} style={{ marginRight: 15 }} />,
          headerLeft: () => (
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "transparent", marginLeft: 15 }}>
              <Ionicons name="stopwatch-sharp" color={Colors.dark.lightText} size={22} />
              <Text style={{ marginLeft: 5, color: Colors.dark.lightText }}>{convertTimeToString(timeSpent)}</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ color }) => <Ionicons name="compass" color={color} size={28} />,
        }}
        listeners={{
          // disabled
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color }) => <Ionicons name="stopwatch-sharp" color={color} size={28} />,
        }}
        listeners={{
          // disabled
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: "Bookmarks",
          tabBarIcon: ({ color }) => <TabBarIcon name="bookmark" color={color} />,
        }}
        listeners={{
          // disabled
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="account-circle" color={color} />,
        }}
        listeners={{
          // disabled
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
    </Tabs>
  );
}
