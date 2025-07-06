import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useCategory } from "../context/CategoryContext";
import { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import ContentModel from "../models/ContentModel";
import ContentService from "../services/ContentService";
import WebView from "react-native-webview";

const { width: screenWidth } = Dimensions.get("window");

const ContentDetailScreen = ({ route, navigation }: any) => {
  const { categories, getAllCategories } = useCategory();
  const [content, setContent] = useState<ContentModel[]>([]);
  const contentService = useMemo(() => new ContentService(), []);

  const { categoryId: initialCategoryId } = route.params;

  const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId);

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    getAllCategories();
    handleContent(initialCategoryId);
  }, [initialCategoryId]);

  useLayoutEffect(() => {
    // ✅ Desplazar automáticamente al render inicial
    const index = categories.findIndex(cat => cat.id === initialCategoryId);
    if (index >= 0) {
      scrollToCategory(index);
    }
  }, [categories]);

  const handleContent = async (id: string, index?: number) => {
    try {
      setSelectedCategoryId(id);
      const data = await contentService.getAll();
      const result = data.filter((item: any) => item.idCategory == id);
      setContent(result);

      if (index !== undefined) {
        scrollToCategory(index);
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const scrollToCategory = (index: number) => {
    const itemWidth = 80 + 14; // minWidth + marginRight
    const offsetX = index * itemWidth - (screenWidth / 2 - itemWidth / 2);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: offsetX > 0 ? offsetX : 0,
        animated: true,
      });
    }
  };

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

  return (
    <View style={styles.container}>
      {/* Categorías (fixed arriba con scroll horizontal) */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((cat, index) => {
          const isSelected = cat.id === selectedCategoryId;
          return (
            <TouchableOpacity
              key={cat.id}
              onPress={() => handleContent(cat.id, index)}
              style={[
                styles.card,
              ]}
            >
              <Text style={{ fontWeight: isSelected ? "bold" : "normal" }}>
                {cat.name}
              </Text>
              {isSelected && (
                <View
                  style={{
                    marginTop: 4,
                    width: "100%",
                    height: 3,
                    backgroundColor: "black",
                  }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Contenido (scroll vertical) */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {content.map((item, index) => (
          <TouchableOpacity key={item.id || index} style={styles.contentItem}>
            <WebView
              style={styles.webview}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              source={{
                uri: getEmbedUrl(item.video, index < 3),
              }}
            />
            <View style={styles.contentTextContainer}>
              <Text style={styles.subtitle}>{`${index + 1}. ${item.name}`}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  card: {
    minWidth: 80,
    height: 40,
    // borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  contentContainer: {
    paddingBottom: 80,
  },
  contentItem: {
    width: "100%",
    height: 220,
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  webview: {
    width: "100%",
    backgroundColor: "#fff",
  },
  contentTextContainer: {
    maxWidth: "60%",
    flex: 1,
    flexDirection: "column",
    padding: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "left",
    color: "black",
  },
  description: {
    color: "#808080",
  },
});

export default ContentDetailScreen;
