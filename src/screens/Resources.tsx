import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { RootStackParamList } from "../routes/Navigation";
import { useEffect, useMemo, useState } from "react";
import GraduatesModel from "../models/GraduatesModel";
import GraduatesService from "../services/GraduatesService";
import WebView from "react-native-webview";
import PodcastService from "../services/PodcastService";
import PodcastModel from "../models/PodcastModel";

const ResourcesScreen = () => {
  const graduatesService = useMemo(() => new GraduatesService(), []);
  const podcastService = useMemo(() => new PodcastService(), []);
  const [graduates, setGraduates] = useState<GraduatesModel[]>([]);
  const [podcast, setPodcast] = useState<PodcastModel[]>([]);

  useEffect(() => {
    const getGraduates = async () => {
      const data = await graduatesService.getAll();
      setGraduates(data);
    };

    const getPodcast = async () => {
      const podcast = await podcastService.getAll();
      setPodcast(podcast);
    };

    getGraduates();
    getPodcast();
  }, []);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Resources">>();

  //este embebed es para videos normales sin autoplay
  const getEmbedUrl = (url: string) => {
    let videoId = "";

    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    } else if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    } else if (url.includes("youtube.com/shorts/")) {
      videoId = url.split("youtube.com/shorts/")[1].split("?")[0];
    }

    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Galeria de egresados CUR-CARAZO</Text>
        {graduates.map((item, index) => (
          <TouchableOpacity
            key={item.id || index}
            style={{
              width: "100%",
              minHeight: 220,
              flex: 1,
              flexDirection: "row",
              gap: 12,
              marginBottom: 20, // para separar cada item
              
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: "40%",
                height: 210,
                alignItems: "center",
                objectFit: "contain",
              }}
            />
            <View
              style={{
                maxWidth: "60%",
                flex: 1,
                flexDirection: "column",
                padding: 8,
              }}
            >
              <Text style={styles.subtitle}>{`${index + 1}. ${
                item.name
              }`}</Text>
              <Text style={{ color: "#808080" }}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <Text style={styles.title}>Podcast</Text>
        {podcast.map((item) => (
          <View key={item.id}>
            <WebView
              style={{
                width: "100%",
                height: 300,
                backgroundColor: "#fff",
              }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={true}
              source={{
                uri: getEmbedUrl(item.video),
              }}
            />
            <Text style={styles.title}>{item.name}</Text>
          </View>
        ))}
        <View style={{ height: 100 }}></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
    color: "black",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
    color: "black",
  },
});

export default ResourcesScreen;
