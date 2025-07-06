import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/context/AuthContext";
import Navigation from "./src/routes/Navigation";
import { CategoryProvider } from "./src/context/CategoryContext";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <CategoryProvider>
          <Navigation />
        </CategoryProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
