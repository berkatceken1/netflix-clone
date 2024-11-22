# Netflix Clone

Modern web teknolojileri kullanılarak geliştirilmiştir.

Bu proje MERN stack (MongoDB, Express.js, React.js, Node.js) kullanılarak oluşturulmuştur.

## 📸 Ekran Görüntüleri

### Ana Sayfa

![Ana Sayfa](frontend/public/screenshots/homePage.png)

### Kayıt Olma Sayfası

![Kayıt Olma Sayfası](frontend/public/screenshots/signUp.png)

### E-posta Doğrulama Sayfası

![E-posta Doğrulama Sayfası](frontend/public/screenshots/emailVerification.png)

### Şifre Sıfırlama Sayfası

![Şifre Sıfırlama Sayfası](frontend/public/screenshots/forgotPassword.png) ![Şifre Sıfırlama Sayfası](frontend/public/screenshots/forgotPassword2.png)

### Filmler Sayfası

![Filmler Sayfası](frontend/public/screenshots/films1.png) ![Filmler Sayfası](frontend/public/screenshots/films2.png)

### İzleme Sayfası

![İzleme Sayfası1](frontend/public/screenshots/watch.png) ![İzleme Sayfası2](frontend/public/screenshots/watch2.png)

### Arama Sayfası

![Arama Sayfası](frontend/public/screenshots/search.png) ![Arama Sayfası](frontend/public/screenshots/search2.png)

## 🚀 Özellikler

- 🔐 JWT tabanlı kimlik doğrulama sistemi
- ✉️ Mailtrap ile email doğrulama
- 🎥 TMDB API entegrasyonu ile film ve dizi verileri
- 🔍 Gelişmiş arama özellikleri (Film, Dizi, Kişi)
- 📱 Responsive tasarım
- 🌙 Dark mode
- 🎬 Video oynatıcı
- 📜 Arama geçmişi
- 🔄 Şifre sıfırlama sistemi

## 🛠️ Teknolojiler

### Frontend

- React.js
- Tailwind CSS
- Zustand (State Management)
- Axios
- React Router
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- JWT
- Mailtrap
- Bcrypt.js

## 🚀 Kurulum

1. Projeyi klonlayın

2. Gerekli paketleri yükleyin

```bash
npm install
```

3. `.env` dosyasını oluşturun ve gerekli değişkenleri ekleyin

```bash
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
MAILTRAP_ENDPOINT=your_mailtrap_endpoint
MAILTRAP_TOKEN=your_mailtrap_token
CLIENT_URL=your_client_url
NODE_ENV=development
PORT=5000
```

4. Derleme işlemini gerçekleştirin

```bash
npm run build
```

5. Projeyi başlatın

```bash
npm run start
```
