import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import UserModel from '../models/UserModel';
import UsersService from '../services/AuthService';
import { storage } from '../utils/Storage';
import { RootStackParamList } from '../routes/Navigation';

interface AuthContextProps {
  isSignedIn: boolean;
  signIn: (data: { username: string; password: string }) => Promise<void>;
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
    const loadToken = () => {
      const storedToken = storage.getString('authToken');
      if (storedToken) {
        setToken(storedToken);
      }
    };
    loadToken();
  }, []);

  useEffect(() => {
    if (token) {
      storage.set('authToken', token);
    } else {
      storage.delete('authToken');
    }
  }, [token]);

  const signIn = async (data: { username: string; password: string }) => {
    try {
      const response = await usersService.signIn(data.username, data.password);
      setToken(response.token);
      navigation.navigate('Home');
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    storage.delete('authToken');
    navigation.navigate('Login');
  };

  const isSignedIn = user !== null;

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, logout, user, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
