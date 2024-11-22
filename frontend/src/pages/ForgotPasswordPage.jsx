import { useState } from "react";
import { useAuthStore } from "../store/authUser";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
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
          {!isSubmitted ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-center text-gray-300 mb-6">
                  E-Posta adresinizi giriniz, şifre sıfırlama bağlantısı size
                  gönderilecektir.
                </p>
                <div className="flex justify-between">
                  <input
                    type="email"
                    value={email}
                    placeholder="E-Posta adresiniz"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 rounded-md bg-gray-800 text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                >
                  {isLoading ? "Yükleniyor..." : "Şifremi sıfırla"}
                </button>
              </form>
              <div className="text-center pt-4">
                <Link
                  to="/login"
                  className="text-sm text-gray-300 hover:underline flex items-center justify-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Giriş yap
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-gray-300 mb-6">
                {email} için şifre sıfırlama bağlantısı gönderildi.
              </p>
              <Link
                to="/login"
                className="text-sm text-gray-300 hover:underline flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Giriş yap
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
