import { logout } from "@/features/auth/authThunks";
import MovieSearchScreen from "@/features/movies/components/MovieSearchScreen";
import { useAppDispatch } from "@/shared/store/hooks";
import { useTheme } from "@/shared/tokens/ThemeProvider";
import { Button, View } from "react-native";

export default function Index() {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}
    >
      <MovieSearchScreen />
      <Button title="Logout" color={colors.primaryPurple} onPress={() => dispatch(logout())} />
    </View>
  );
}
