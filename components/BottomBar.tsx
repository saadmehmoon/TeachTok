import { Text, View } from "./Themed";
import PlaylistIcon from "../assets/icons/playlist-icon.svg";
import NextIcon from "../assets/icons/bottom-next-icon.svg";

type Props = {
  unit: string;
  playlist: string;
};

export default function BottomBar({ unit, playlist }: Props) {
  return <View
    style={{
      backgroundColor: "#161616",
      width: "100%",
      padding: 15,
      flexDirection: "row",
      justifyContent: "space-between",
    }}
  >
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        backgroundColor: "transparent",
      }}
    >
      <PlaylistIcon />
      <Text
        style={{
          fontWeight: "600",
          fontSize: 16,
        }}
      >{`Playlist • Unit ${unit.slice(0, 1)}: ${playlist}`}</Text>
    </View>
    <NextIcon />
  </View>;
}
