import AppImage from "@/shared/ui/app-image";
import AppText from "@/shared/ui/app-text";
import { useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { useMovieSearch } from "../hooks/useMovieSearch";

const POSTER_BASE = "https://image.tmdb.org/t/p/w342";

export default function MovieSearchScreen() {
    const [text, setText] = useState("");
    const { data, isLoading, isError } = useMovieSearch(text);

    return (
        <View style={sheet.container}>
            <TextInput
                style={sheet.textInput}
                value={text}
                placeholder="Search Movie"
                onChangeText={setText}
            />
            {isLoading && <AppText>Searching</AppText>}

            {isError && <AppText>Something went wrong</AppText>}

            {data && data.length > 0 && (
                <FlatList
                    data={data}
                    keyExtractor={(movie) => String(movie.id)}
                    renderItem={({ item }) => (
                        <View style={sheet.rowContainer}>
                            {item.poster_path && (
                                <AppImage source={`${POSTER_BASE}${item.poster_path}`} style={sheet.image} />
                            )}
                            <AppText>{item.title}</AppText>
                        </View>
                    )}
                />
            )}

            {data && data.length === 0 && <AppText>No results</AppText>}
        </View>
    );
}

const sheet = StyleSheet.create({
    container: { flex: 1, padding: 16, gap: 12 },
    textInput: { borderWidth: 1, height: 40, padding: 8, borderColor: "#ccc", borderRadius: 12 },
    rowContainer: { flexDirection: "row", marginBottom: 12, gap: 12 },
    image: { width: 80, height: 120, borderRadius: 8 },
});
