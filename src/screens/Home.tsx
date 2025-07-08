import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import WebView from "react-native-webview";
import { RootStackParamList } from "../routes/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Speech from "expo-speech";
import CategoryModel from "../models/CategoryModel";
import { Ionicons } from "@expo/vector-icons";

const categoryData = [
  new CategoryModel(
    "gjvjhvkhbkH6h",
    "Señas",
    "Esta categoría incluye subcategorías como Familia, Saludos, Colores y Números, diseñadas para ayudarte a comunicarte de manera inclusiva y efectiva desde lo más básico hasta lo cotidiano.",
    "https://youtube.com/shorts/ltAopKpKJts?feature=share",
    "image.png",
    true
  ),
  new CategoryModel(
    "gjjhvjvkhbkH6h",
    "Alfabeto Manual",
    "La presente categoría pretende enseñar el alfabeto manual del Lenguaje de Señas, facilitando el aprendizaje de cada letra a través de señas claras. ",
    "https://youtube.com/shorts/efVI5k6hkvk?feature=share",
    "image.png",
    true
  ),
];

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const HomeScreen = ({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState(categoryData);

  useEffect(() => {
    const filtered = categoryData.filter((cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchQuery]);

  const getEmbedUrl = (url: string, autoplay: boolean = false) => {
    let videoId = "";

    if (url.includes("youtube.com/shorts/")) {
      videoId = url.split("youtube.com/shorts/")[1].split("?")[0];
    } else if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    }

    return `https://www.youtube.com/embed/${videoId}?autoplay=${
      autoplay ? 1 : 0
    }&mute=1&controls=1&loop=1&playlist=${videoId}`;
  };

  const speakDescription = (text: string) => {
    Speech.stop();
    Speech.speak(text, {
      language: "es-ES",
      rate: 0.9,
      pitch: 1.0,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* 🔍 Search bar con icono */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Buscar categoría..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.input}
          />
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Categorias</Text>
          <Text
            onPress={() => navigation.navigate("Resources")}
            style={[styles.title, { color: "blue", fontSize: 20 }]}
          >
            Recursos
          </Text>
        </View>

        {/* Lista filtrada */}
        {filteredCategories.map((cat, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ContentDetail", {
                categoryId: cat.id,
              })
            }
            key={cat.id || index}
            style={styles.card}
          >
            <WebView
              style={styles.webview}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              source={{
                uri: getEmbedUrl(cat.video, index < 3),
              }}
            />
            <View style={styles.cardContent}>
              <Text style={styles.subtitle}>{`${index + 1}. ${cat.name}`}</Text>
              <Text style={{ color: "#808080" }}>{cat.description}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => speakDescription(cat.description)}
              >
                <Text style={styles.buttonText}>Escuchar 🔊</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {filteredCategories.length === 0 && (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No se encontraron resultados.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    color: "black",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
    color: "black",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    elevation: 2,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
  card: {
    width: "100%",
    height: 220,
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  webview: {
    width: "100%",
    maxHeight: "auto",
    backgroundColor: "#fff",
  },
  cardContent: {
    maxWidth: "60%",
    flex: 1,
    flexDirection: "column",
    padding: 8,
    gap: 6,
  },
  button: {
    backgroundColor: "#339999",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 8,
    width: "100%",
    height: 50,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default HomeScreen;
