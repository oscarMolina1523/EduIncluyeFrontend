import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RootStackParamList } from "../routes/Navigation";

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Login">>();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://reactnative.dev/docs/assets/p_cat2.png",
          }}
          style={{
            width: "100%",
            height: "30%",
            alignItems: "center",
            objectFit: "contain",
          }}
        />
        <Text style={styles.title}>Bienvenido a EDU-INCLUYE!</Text>
        <View>
          <Text style={styles.text}>Usuario</Text>
          <TextInput
            keyboardType="email-address"
            style={styles.input}
            placeholder="ejemplo@gmail.com"
          />
        </View>
        <View>
          <Text style={styles.text}>Contraseña</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="password"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Iniciar Sesion</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text>¿No tienes una cuenta?</Text>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Register")}
          >
            Registrarse
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 14,
    textAlign: "left",
    color: "black",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  button: {
    backgroundColor: "#339999",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "100%",
    height: 50,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  link: {
    color: "blue",
    marginLeft: 5,
  },
});

export default LoginScreen;
