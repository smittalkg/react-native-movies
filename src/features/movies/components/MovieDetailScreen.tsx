import AppImage from "@/shared/ui/app-image";
import AppText from "@/shared/ui/app-text";
import { images } from "@/shared/ui/images";
import { LoadingSpinner } from "@/shared/ui/loading-spinner";
import { ScrollView, StyleSheet, View } from "react-native";
import { useMovieDetail } from "../hooks/useMovieDetail";

const POSTER_BASE = "https://image.tmdb.org/t/p/w342";

export default function MovieDetailScreen({ id }: { id: number }) {
    const { data, isLoading, isError } = useMovieDetail(id);

    return (
        <ScrollView>
            {isLoading && (
                <LoadingSpinner />
            )}

            {isError && <AppText>Something went wrong...</AppText>}

            {data && (
                <View style={style.contentView}>
                    <AppText>{data.title}</AppText>
                    <AppText>{data.tagline}</AppText>
                    {data.runtime && <AppText>{data.runtime} min</AppText>}
                    {data.genres.map((genre) => (
                        <AppText key={genre.id}>{genre.name}</AppText>
                    ))}
                    <AppText>{data.overview}</AppText>
                    <AppImage source={data.poster_path ? `${POSTER_BASE}${data.poster_path}` : images.placeholderPoster} style={style.image} />
                </View>
            )}
        </ScrollView>
    );
}

const style = StyleSheet.create({
    contentView: { padding: 16, gap: 8 },
    image: { width: 200, height: 200 },
});
