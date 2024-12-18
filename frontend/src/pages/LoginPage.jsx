import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authUser";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoggingIn, error } = useAuthStore();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password });

      // Login başarılı ve email doğrulanmamışsa
      if (result?.requiresVerification) {
        navigate("/verify-email");
        return;
      }

      // Login başarılı ve email doğrulanmışsa
      if (result?.success) {
        navigate("/");
        return;
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="h-screen w-full background-bg ">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Giriş Yap
          </h1>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-200 block"
              >
                Eposta
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-500 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="you@example.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-200 block"
              >
                Şifre
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-500 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="********"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center mb-6">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-400 hover:underline"
              >
                Şifremi unuttum
              </Link>
            </div>

            {error && (
              <p className="text-red-500 font-semibold mb-2">{error}</p>
            )}

            <button
              className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Yükleniyor..." : "Giriş Yap"}
            </button>
          </form>
          <div className="text-center text-gray-400">
            Henüz bir hesabınız yok mu?{" "}
            <Link to={"/signup"} className="text-red-500 hover:underline">
              Kayıt Ol
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
