import AppText from "@/shared/ui/app-text";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppText variant="heading">Edit app/index.tsx to edit this screen.</AppText>
    </View>
  );
}
