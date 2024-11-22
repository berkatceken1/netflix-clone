import { useAuthStore } from "../../store/authUser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const HomePage = () => {
  const { user, isAuthenticated } = useAuthStore();

  return <>{isAuthenticated && user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default HomePage;
