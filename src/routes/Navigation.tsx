import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import HomeScreen from "../screens/Home";
import ContentDetailScreen from "../screens/ContentDetail";
import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  ContentDetail: { categoryId: string };
};
const Stack = createNativeStackNavigator<RootStackParamList>();
const Navigation = () => {
  const { logout } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#4DB6AC" }, // Cambia el color del header
        headerTintColor: "#ffff", // Color del texto e íconos
        headerTitleStyle: { fontWeight: "bold" }, // Estilos del título
      }}
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: "Registrarse",
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          title: "EDU-INCLUYE",
          headerRight: () => (
            <View
              style={{
                marginRight: 12, // espacio del borde derecho
                padding: 8, // área táctil cómoda
                minWidth: 44, // tamaño mínimo recomendado por Apple/Google
                minHeight: 44,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={logout}>
                <Ionicons name="log-out-outline" size={28} color="white" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ContentDetail"
        component={ContentDetailScreen}
        options={{
          title:"Detalles de Categoria",
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
