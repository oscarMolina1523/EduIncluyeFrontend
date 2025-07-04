import React from "react";
import { View, StyleSheet, Text } from "react-native";
import WebView from "react-native-webview";

const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <View
        style={{
          width: "100%",
          maxHeight: 220,
          flex: 1,
          flexDirection: "row",
          gap: 12,
          backgroundColor: "#FFFF00",
        }}
      >
        <WebView
          style={{ width: "100%", maxHeight: "auto" }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          source={{
            uri: "https://www.youtube.com/embed/wVuDj9V3olo?autoplay=1&mute=1&controls=0&loop=1&playlist=wVuDj9V3olo",
          }}
        />
        <View style={{ maxWidth: "60%", flex: 1, flexDirection: "column" }}>
          <Text style={styles.subtitle}>1.Alfabeto Manual</Text>
          <Text style={{color:"#808080"}}>
            La presente categoría pretende enseñar el alfabeto manual del
            Lenguaje de Señas, facilitando el aprendizaje de cada letra a través
            de señas claras.{" "}
          </Text>
        </View>
      </View>
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
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
    color: "black",
  },
});

export default HomeScreen;
