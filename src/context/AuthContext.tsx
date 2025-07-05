import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserModel from "../models/UserModel";
import UsersService from "../services/AuthService";
import { RootStackParamList } from "../routes/Navigation";

interface AuthContextProps {
  isSignedIn: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  logout: () => void;
  user: UserModel | null;
  token: string | null;
}

const AuthContext = createContext<AuthContextProps>({
  isSignedIn: false,
  signIn: async () => {},
  logout: () => {},
  user: null,
  token: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const usersService = new UsersService();

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("authToken");
        if (storedToken) {
          setToken(storedToken);
          // Opcional: cargar user si lo guardas o fetch profile aquí
        }
      } catch (error) {
        console.error("Error loading token", error);
      }
    };
    loadToken();
  }, []);

  useEffect(() => {
    const saveToken = async () => {
      try {
        if (token) {
          await AsyncStorage.setItem("authToken", token);
        } else {
          await AsyncStorage.removeItem("authToken");
        }
      } catch (error) {
        console.error("Error saving token", error);
      }
    };
    saveToken();
  }, [token]);

  const signIn = async (username: string, password: string) => {
    try {
      const response = await usersService.signIn(username, password);
      setToken(response.token);
      await AsyncStorage.setItem("authToken", response.token); // GUARDA DIRECTAMENTE
      console.log("Token recibido:", response);
      console.log("Token recibido:", response.token);
      navigation.navigate("Home");
    } catch (err) {
      console.error("Login error", err);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setToken(null);
      await AsyncStorage.removeItem("authToken");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const isSignedIn = token !== null;

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, logout, user, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
