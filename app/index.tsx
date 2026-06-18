import { logout } from "@/features/auth/authThunks";
import MovieSearchScreen from "@/features/movies/components/MovieSearchScreen";
import { useAppDispatch } from "@/shared/store/hooks";
import { Button, View } from "react-native";

export default function Index() {
  const dispatch = useAppDispatch();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MovieSearchScreen />
      <Button title="Logout" onPress={() => dispatch(logout())} />
    </View>
  );
}
