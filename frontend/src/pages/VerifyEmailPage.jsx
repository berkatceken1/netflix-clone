import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "../store/authUser";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyEmailPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { error, isLoading, user } = useAuthStore();
  const email = user?.email;

  const handleChange = (index, value) => {
    const newCode = [...code];

    // handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // focus on the last non-empty input or the first empty input
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      const response = await axios.post("/api/v1/auth/verify-email", {
        code: verificationCode,
        email: email,
      });
      console.log("Verification response:", response.data);

      if (response.data.success) {
        toast.success("E-posta başarıyla doğrulandı");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Doğrulama başarısız");
      console.log("Verify email error:", error.response?.data); // debug için
      console.error("Verify email error:", error); // hata logu için
    }
  };

  // Auto submit when all inputs are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [code]);

  return (
    <div className="h-screen w-full background-bg ">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <img src="/netflix-logo.png" alt="logo" className="w-52" />
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-white to-emerald-200 text-transparent bg-clip-text">
            E-Posta Doğrulama
          </h2>
          <p className="text-center text-gray-300 mb-6">
            {email} adresinize gönderilen 6 haneli doğrulama kodunu giriniz.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="6"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-red-600 disabled:outline-none"
                />
              ))}
            </div>
            {error && (
              <p className="text-red-500 font-semibold mt-2">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 py-3 rounded-md text-white font-bold"
              disabled={isLoading || code.some((digit) => !digit)}
            >
              {isLoading ? "Doğrulanıyor..." : "Doğrula"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
