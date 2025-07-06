import { View, Text, StyleSheet } from "react-native";

const ResourcesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>this is a resource screen</Text>
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
});

export default ResourcesScreen;
