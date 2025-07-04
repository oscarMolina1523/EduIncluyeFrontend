import { View, StyleSheet, Text } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <View></View>
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
    paddingTop:12,
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
