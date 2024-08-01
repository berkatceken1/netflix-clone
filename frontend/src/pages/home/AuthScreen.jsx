import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/signup?email=${email}`);
  };

  return (
    <div className="background-bg relative">
      {/* Navbar */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <img src="/netflix-logo.png" alt="logo" className="w-52" />
        <Link to={"/login"} className="text-white bg-red-600 py-1 px-2 rounded">
          Oturum Aç
        </Link>
      </header>

      {/* hero section */}
      <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Sınırsız film, dizi ve çok daha fazlası
        </h1>
        <p className="text-lg mb-4">
          İstediğiniz yerde izleyin. İstediğiniz zaman iptal edin.
        </p>
        <h3 className="text-2xl mb-4">
          İzlemeye hazır mısınız? Üye olmak ya da hesabınıza tekrar ulaşmak için
          tek yapmanız gereken e-posta adresinizi girmek.
        </h3>
        <form
          className="flex flex-col md:flex-row gap-4 w-1/2"
          onSubmit={handleFormSubmit}
        >
          <input
            type="email"
            placeholder="E-posta adresinizi girin"
            className="p-2 rounded flex-1 bg-black/80 border border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center">
            Başlayın
            <ChevronRight className="size-8 md:size-10" />
          </button>
        </form>
      </div>

      {/* separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 1st section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          {/* left side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Televizyonunuzda izleyin
            </h2>
            <p className="text-lg md:text-xl">
              Akıllı TV, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray
              oynatıcılar ve daha fazlasında seyredin.
            </p>
          </div>

          {/* right side */}
          <div className="flex-1 relative">
            <img src="/tv.png" alt="Tv image" className="mt-4 z-20 relative" />
            <video
              playsInline
              autoPlay={true}
              loop
              muted
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 2nd section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
          {/* left side */}
          <div className="flex-1">
            <div className="relative">
              <img
                src="/stranger-things-l.png"
                alt="Stranger Things Large img"
                className="mt-4"
              />

              <div className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2">
                <img
                  src="stranger-things-sm.png"
                  alt="Stranger Things Small img"
                  className="h-full"
                />
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-0">
                    <span className="text-md lg:text-lg font-bold">
                      Stranger Things
                    </span>
                    <span className="text-sm text-blue-500">
                      İndiriliyor...
                    </span>
                  </div>
                  <img
                    src="/netflix-download.gif"
                    alt="Netflix Download gif"
                    className="h-12"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* right side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              Çevrimdışı izlemek için içerikleri indirin
            </h2>
            <p className="text-lg md:text-xl">
              En sevdiğiniz içerikleri kolayca kaydedin ve her zaman izleyecek
              bir şeyleriniz olsun.
            </p>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 3rd section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
          {/* left side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              İstediğiniz her yerde izleyin
            </h2>
            <p className="text-lg md:text-xl">
              Telefonda, tablette, bilgisayarda, televizyonda sınırsız film ve
              dizi izleyin.
            </p>
          </div>

          {/* right side */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src="/device-pile.png"
              alt="Devices image"
              className="mt-4 z-20 relative"
            />
            <video
              playsInline
              autoPlay={true}
              loop
              muted
              className="absolute top-2 left-1/2 -translate-x-1/2 h-4/6 z-10 max-w-[63%]"
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 4th section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
          {/* left side */}
          <div className="flex-1">
            <div className="relative">
              <img src="/kids.png" alt="Kids img" className="mt-4" />
            </div>
          </div>

          {/* right side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              Çocuklarınız için profiller oluşturun
            </h2>
            <p className="text-lg md:text-xl">
              Üyeliğinize dâhil olan bu ücretsiz deneyim sayesinde çocuklarınız,
              sadece onlara özel bir alanda en sevdikleri karakterlerle
              maceralara atılabilir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;