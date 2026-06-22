import LottieView from "lottie-react-native";

export function LoadingSpinner({ size = 200 }: { size?: number }) {
    return (
        <LottieView
            source={require("@assets/lottie/loading-spinner.json")}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
        />
    );
}

