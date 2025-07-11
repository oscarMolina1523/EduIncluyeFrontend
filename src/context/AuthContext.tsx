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
import { jwtDecode } from "jwt-decode";

interface AuthContextProps {
  isSignedIn: boolean;
 signIn: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  user: UserModel | null;
  token: string | null;
}

const AuthContext = createContext<AuthContextProps>({
  isSignedIn: false,
  signIn: async () => ({ success: false, message: "Not implemented" }),
  signUp: async () => {},
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
          const decoded: any = jwtDecode(storedToken);
          const userData = new UserModel(
            decoded.id,
            decoded.name,
            decoded.email,
            decoded.image,
            decoded.isActive
          );
          setUser(userData);
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
      await AsyncStorage.setItem("authToken", response.token); // Guarda primero
      setToken(response.token); // Luego actualiza estado
      const decoded: any = jwtDecode(response.token);
      const userData = new UserModel(
        decoded.id,
        decoded.name,
        decoded.email,
        decoded.image,
        decoded.isActive
      );
      setUser(userData);
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
      return { success: true }; // ✅ devuelve success
    } catch (err: any) {
      // Devuelve un mensaje amigable si el backend devuelve mensaje
      if (err.message) {
        return { success: false, message: err.message };
      }
      return { success: false, message: "Ocurrió un error. Intenta de nuevo" };
    }
  };

  const signUp = async (username: string, email: string, password: string) => {
    try {
      const response = await usersService.signUp(username, email, password);
      await AsyncStorage.setItem("authToken", response.token);
      setToken(response.token);
      const decoded: any = jwtDecode(response.token);
      const userData = new UserModel(
        decoded.id,
        decoded.name,
        decoded.email,
        decoded.image,
        decoded.isActive
      );
      setUser(userData);
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } catch (err) {
      console.error("Register error", err);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setToken(null);
      await AsyncStorage.removeItem("authToken");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const isSignedIn = token !== null;

  return (
    <AuthContext.Provider
      value={{ isSignedIn, signIn, signUp, logout, user, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
