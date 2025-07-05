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
  Keyboard,
} from "react-native";
import { RootStackParamList } from "../routes/Navigation";
import { useRef } from "react";
import { useAuth } from "../context/AuthContext";

const RegisterScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Login">>();

  const auth = useAuth();
  const emailRef = useRef<string>("");
  const passwordRef = useRef<string>("");
  const confirmPasswordRef = useRef<string>("");
  const nameRef = useRef<string>("");

  const handleRegister = async () => {
    Keyboard.dismiss();
    const email = emailRef.current;
    const password = passwordRef.current;
    const confirmPassword = confirmPasswordRef.current;
    const name = nameRef.current;
    
    if (!email || !password || !confirmPassword || !name) {
      alert("Por favor ingrese email, nombre, contraseña y confirmación de contraseña");
      return;
    }

    if ( password != confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }


    await auth.signUp(name, email, password);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {/* <Image
          source={{
            uri: "https://i.ibb.co/LyxKpZD/logo.png",
          }}
          style={{
            width: "100%",
            height: "20%",
            alignItems: "center",
            objectFit: "contain",
          }}
        /> */}
        <Text style={styles.title}>Bienvenido a EDU-INCLUYE!</Text>
        <View>
          <Text style={styles.text}>Nombre de Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="Jorge Nahum"
            onChangeText={(text) => (nameRef.current = text)}
            returnKeyType="next"
          />
        </View>
        <View>
          <Text style={styles.text}>Email</Text>
          <TextInput
            keyboardType="email-address"
            style={styles.input}
            placeholder="ejemplo@gmail.com"
            onChangeText={(text) => (emailRef.current = text)}
            returnKeyType="next"
          />
        </View>
        <View>
          <Text style={styles.text}>Contraseña</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="password"
            onChangeText={(text) => (passwordRef.current = text)}
            returnKeyType="next"
          />
        </View>
        <View>
          <Text style={styles.text}>Confirmar contraseña</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="confirm password"
            onChangeText={(text) => (confirmPasswordRef.current = text)}
            returnKeyType="none"
            onSubmitEditing={handleRegister}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text>¿Ya tienes una cuenta?</Text>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
          >
            Iniciar Sesión
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
    height: "auto",
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

export default RegisterScreen;
