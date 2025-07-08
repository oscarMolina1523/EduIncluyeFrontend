import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import WebView from "react-native-webview";
import { RootStackParamList } from "../routes/Navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCategory } from "../context/CategoryContext";
import * as Speech from "expo-speech";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const HomeScreen = ({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) => {
  const { categories, getAllCategories, loading } = useCategory();

  useEffect(() => {
    getAllCategories();
  }, []);
  // const categoriesService = React.useMemo(() => new CategoryService(), []);

  // const [categories, setCategories] = React.useState<CategoryModel[]>([]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const result = await categoriesService.getAll();
  //     setCategories(result);
  //   };

  //   fetchCategories();
  // }, [categoriesService]);

  const getEmbedUrl = (url: string, autoplay: boolean = false) => {
    // Extrae el ID del video desde un link normal de YouTube
    let videoId = "";

    if (url.includes("youtube.com/shorts/")) {
      videoId = url.split("youtube.com/shorts/")[1].split("?")[0];
    } else if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1].split("&")[0];
    }

    // Construye la URL embed con parámetros deseados
    return `https://www.youtube.com/embed/${videoId}?autoplay=${
      autoplay ? 1 : 0
    }&mute=1&controls=1&loop=1&playlist=${videoId}`;
  };

  const speakDescription = (text: string) => {
    Speech.stop(); // Detiene reproducción previa
    Speech.speak(text, {
      language: "es-ES",
      rate: 0.9,
      pitch: 1.0,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.title}>Categorias</Text>
          <Text
            onPress={() => {
              navigation.navigate("Resources");
            }}
            style={[styles.title, { color: "blue", fontSize: 20 }]}
          >
            Recursos
          </Text>
        </View>
        {categories.map((cat, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ContentDetail", {
                categoryId: cat.id,
              })
            }
            key={cat.id || index}
            style={{
              width: "100%",
              height: 220,
              flex: 1,
              flexDirection: "row",
              gap: 12,
              marginBottom: 20, // para separar cada item
            }}
          >
            <WebView
              style={{
                width: "100%",
                maxHeight: "auto",
                backgroundColor: "#fff",
              }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              source={{
                uri: getEmbedUrl(cat.video, index < 3), // autoplay solo en el primer video (ejemplo)
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
              <Text style={styles.subtitle}>{`${index + 1}. ${cat.name}`}</Text>
              <Text style={{ color: "#808080" }}>{cat.description}</Text>
              <Button
                title="Escuchar descripción"
                onPress={() => speakDescription(cat.description)}
              />
            </View>
          </TouchableOpacity>
        ))}

        {/* <WebView
          style={{ width: "100%", maxHeight: "auto",backgroundColor: '#ffff'}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          source={{
            uri: "https://www.youtube.com/embed/wVuDj9V3olo?autoplay=1&mute=1&controls=0&loop=1&playlist=wVuDj9V3olo",
          }}
        />
        <View style={{ maxWidth: "60%", flex: 1, flexDirection: "column", padding:8 }}>
          <Text style={styles.subtitle}>1.Alfabeto Manual</Text>
          <Text style={{color:"#808080"}}>
            La presente categoría pretende enseñar el alfabeto manual del
            Lenguaje de Señas, facilitando el aprendizaje de cada letra a través
            de señas claras.{" "}
          </Text>
        </View> */}
      </View>
    </ScrollView>
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
