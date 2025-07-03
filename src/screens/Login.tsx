import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet } from "react-native";
import { RootStackParamList } from "../routes/Navigation";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>this is the login screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:"100%",
    height:"100%",
    flex: 1,
    flexDirection:"column",
    textAlign:"center",
    justifyContent:"center",
    backgroundColor:"#F5F5F5",
  },
  text:{
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  }
});

export default LoginScreen;
