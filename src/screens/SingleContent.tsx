import { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import WebView from "react-native-webview";
import ContentService from "../services/ContentService";
import ContentModel from "../models/ContentModel";

const SingleContentScreen = ({ route, navigation }: any) => {
  const { contentId } = route.params;
  const contentService = useMemo(() => new ContentService(), []);
  const [content, setContent] = useState<ContentModel | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleSingleContent(contentId);
  }, [contentId]);

  const handleSingleContent = async (id: string) => {
    try {
      const data = await contentService.getById(id);
      setContent(data);
    } catch (error) {
      console.error("Error fetching single content:", error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#339999" />
      </View>
    );
  }

  if (!content) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No se encontró el contenido.</Text>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
    >
      <View style={styles.container}>
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
            uri: getEmbedUrl(content.video),
          }}
        />
        <Text style={styles.title}>{content.name}</Text>
        <Text style={styles.description}>{content.description}</Text>
      </View>
      <View style={{ height: 100 }}></View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "left",
    color: "black",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
    textAlign: "left",
    paddingHorizontal: 10,
  },
});

export default SingleContentScreen;
