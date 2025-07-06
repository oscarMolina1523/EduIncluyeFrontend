import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useCategory } from "../context/CategoryContext";
import { useEffect } from "react";

const ContentDetailScreen = ({ route, navigation }: any) => {
  const { categories, getAllCategories, loading } = useCategory();

  useEffect(() => {
    getAllCategories();
  }, []);
  const { categoryId } = route.params;
  
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 20 }}
      >
        {categories.map((cat, index) => {
          const isSelected = cat.id === categoryId;
          return (
            <View style={styles.card} key={cat.id}>
              <Text style={{ fontWeight: isSelected ? "bold" : "normal" }}>{cat.name}</Text>
              {isSelected && (
                <View
                  style={{
                    marginTop: 4, // espacio entre texto y línea
                    width: "100%",
                    height: 3, // grosor de la línea
                    backgroundColor: "black",
                  }}
                />
              )}
            </View>
          );
        })}
      </ScrollView>
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
  },
  card: {
    width: "auto",
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
});

export default ContentDetailScreen;
