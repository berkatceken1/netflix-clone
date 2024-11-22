import { useState } from "react";
import { useAuthStore } from "../store/authUser";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { Lock } from "lucide-react";
import { toast } from "react-hot-toast";
const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, isLoading, error, message } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Şifreler eşleşmiyor");
      return;
    }
    try {
      await resetPassword(token, password);
      toast.success(
        "Şifre başarıyla değiştirildi, giriş sayfasına yönlendiriliyorsunuz..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Parola değiştirme hatası");
    }
  };

  return (
    <div className="h-screen w-full background-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <img src="/netflix-logo.png" alt="logo" className="w-52" />
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-white to-emerald-200 text-transparent bg-clip-text">
            Şifremi unuttum
          </h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

          <form onSubmit={handleSubmit}>
            <Input
              icon={Lock}
              type="password"
              placeholder="Yeni Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              icon={Lock}
              type="password"
              placeholder="Yeni Şifre Onayı"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
            >
              {isLoading ? "Yükleniyor..." : "Şifremi sıfırla"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
