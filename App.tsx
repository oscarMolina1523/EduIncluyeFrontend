import AuthProvider from "./src/context/AuthContext";
import Navigation from "./src/routes/Navigation";

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
