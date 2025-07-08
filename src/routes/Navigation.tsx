import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import HomeScreen from "../screens/Home";
import ContentDetailScreen from "../screens/ContentDetail";
import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import ResourcesScreen from "../screens/Resources";
import ProfileScreen from "../screens/ProfileScreen";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  ContentDetail: { categoryId: string };
  Resources: undefined;
  Profile: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();
const Navigation = () => {
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
        options={({ navigation }) => ({
          headerShown: true,
          title: "EDU-INCLUYE",
          headerRight: () => (
            <View
              style={{
                padding: 8,
                minWidth: 80,
                minHeight: 44,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Ionicons
                  name="person-circle-outline"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      />

      <Stack.Screen
        name="ContentDetail"
        component={ContentDetailScreen}
        options={{
          title: "Detalles de Categoria",
        }}
      />
      <Stack.Screen
        name="Resources"
        component={ResourcesScreen}
        options={{
          title: "Recursos",
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Perfil",
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
