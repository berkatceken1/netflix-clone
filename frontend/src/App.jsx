import { Route, Routes, Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/home/HomePage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import NotFoundPage from "./pages/NotFoundPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const LoadingScreen = () => (
  <div className="h-screen flex items-center justify-center bg-black">
    <Loader className="animate-spin text-red-600 size-10" />
  </div>
);

const ProtectedRoute = ({ children }) => {
  const { user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <LoadingScreen />;
  }

  // Kullanıcı yoksa ana sayfaya yönlendir (önceden login'e yönlendiriyordu)
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Kullanıcı giriş yapmış ama emaili doğrulanmamışsa verify-email sayfasına yönlendir
  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

// Giriş yapmış kullanıcıları yönlendirmek için wrapper component
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <LoadingScreen />;
  }

  // Kullanıcı giriş yapmış ve emaili doğrulanmışsa ana sayfaya yönlendir
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Doğrulanmamış email'i olan kullanıcılar için wrapper
const RequireUnverifiedEmail = ({ children }) => {
  const { user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return <LoadingScreen />;
  }

  // Kullanıcı yoksa login'e yönlendir
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Kullanıcının email'i zaten doğrulanmışsa ana sayfaya yönlendir
  if (user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen ">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Auth routes - giriş yapmış kullanıcıları yönlendir */}
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        {/* Email doğrulama route'u - sadece doğrulanmamış kullanıcılar için */}
        <Route
          path="/verify-email"
          element={
            <RequireUnverifiedEmail>
              <VerifyEmailPage />
            </RequireUnverifiedEmail>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        {/* Diğer korumalı route'lar */}
        <Route
          path="/watch/:id"
          element={
            <ProtectedRoute>
              <WatchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <SearchHistoryPage />
            </ProtectedRoute>
          }
        />
        {/* 404 sayfası */}
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />

      <Toaster />
    </>
  );
}

export default App;
