import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authUser";

const SignUpPage = () => {
  const { searchParams } = new URL(document.location); // url'den gelen parametreleri almak için kullanılıyor
  const emailValue = searchParams.get("email"); // url'den gelen email parametresini alıyoruz

  const [email, setEmail] = useState(emailValue || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const { signup, isSigningUp } = useAuthStore();

  const handleSignUp = (e) => {
    e.preventDefault();
    signup({ email, username, password, repassword });
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
            Kayıt Ol
          </h1>
          <form className="space-y-4" onSubmit={handleSignUp}>
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
                htmlFor="username"
                className="text-sm font-medium text-gray-200 block"
              >
                Kullanıcı Adı
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 mt-1 border border-gray-500 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="kullanıcı adı"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-200 block"
              >
                Yeniden Şifre
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-500 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="********"
                id="password"
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
              />
            </div>

            <button
              className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
              disabled={isSigningUp}
            >
              {isSigningUp ? "Yükleniyor..." : "Kayıt Ol"}
            </button>

            <div className="text-center text-gray-400">
              Zaten bir hesabınız var mı?{" "}
              <Link to={"/login"} className="text-red-500 hover:underline">
                Giriş Yap
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
