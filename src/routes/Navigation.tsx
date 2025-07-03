import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import HomeScreen from "../screens/Home";
import ContentDetailScreen from "../screens/ContentDetail";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  ContentDetail: { categoryId: string };
};
const Stack = createNativeStackNavigator<RootStackParamList>();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#4DB6AC" }, // Cambia el color del header
          headerTintColor: "#ffff", // Color del texto e íconos
          headerTitleStyle: { fontWeight: "bold",}, // Estilos del título
        }}
        initialRouteName="Login"
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Inicio de sesión",
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
          }}
        />
        <Stack.Screen
          name="ContentDetail"
          component={ContentDetailScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
