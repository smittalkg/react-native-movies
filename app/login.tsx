import { login } from "@/features/auth/authThunks";
import { useAppDispatch } from "@/shared/store/hooks";
import { useTheme } from "@/shared/tokens/ThemeProvider";
import AppText from "@/shared/ui/app-text";
import { Button, View } from "react-native";

export default function Login() {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        backgroundColor: colors.white,
      }}
    >
      <AppText variant="heading1">Sign in</AppText>
      <Button
        title="Log in (mock)"
        color={colors.primaryPurple}
        onPress={() => dispatch(login("mock-token"))}
      />
    </View>
  );
}
