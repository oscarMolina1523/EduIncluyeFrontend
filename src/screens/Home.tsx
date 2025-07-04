import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import WebView from "react-native-webview";
import YoutubePlayer from "react-native-youtube-iframe";

const HomeScreen = () => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Forzar autoplay después de 1 segundo
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPlaying(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      {/* <YoutubePlayer
        height={200}
        play={playing}
        videoId="wVuDj9V3olo"
        onReady={() => setPlaying(true)} // Activa play cuando el player esté listo
        initialPlayerParams={{
          mute: muted,
          controls: true,
        }}
      /> */}
      <WebView
        style={{ height: 200 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        source={{
          uri: "https://www.youtube.com/embed/wVuDj9V3olo?autoplay=1&mute=1&controls=0&loop=1&playlist=wVuDj9V3olo",
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
    color: "black",
  },
});

export default HomeScreen;
