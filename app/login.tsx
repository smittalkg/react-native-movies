import { login } from "@/features/auth/authThunks";
import { useAppDispatch } from "@/shared/store/hooks";
import AppText from "@/shared/ui/app-text";
import { Button, View } from "react-native";

export default function Login() {
  const dispatch = useAppDispatch();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 16 }}>
      <AppText variant="title">Sign in</AppText>
      <Button title="Log in (mock)" onPress={() => dispatch(login("mock-token"))} />
    </View>
  );
}
