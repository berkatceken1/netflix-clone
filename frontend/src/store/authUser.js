import { create } from 'zustand';
import axios from 'axios';
//const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/v1/auth" : "/api/v1/auth";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/v1/auth" : "/api/v1/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({ 
    user: null,
    isAuthenticated: false,
    error: null,
    message: null,
    isLoading: false,
    isSigningUp: false,
    isCheckingAuth: true, // bu kısmı true yapmamızın sebebi, kullanıcı sayfayı ilk açtığında kullanıcı bilgileri kontrol edilirken, bu süreçte kullanıcıya bir yükleme ekranı göstermek istememiz
    isLoggingOut: false, 
    isLoggingIn: false,

    signup: async (credentials) => {
        set({ isSigningUp: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, credentials);

            // Kullanıcı bilgilerini state'e kaydet
            set({
                user: response.data.user,
                isAuthenticated: false, // Email doğrulanana kadar false
                isSigningUp: false,
                error: null,
                message: "Kayıt başarılı! Lütfen email adresinizi doğrulayın."
            });

        // Başarılı kayıt sonrası verify-email sayfasına yönlendir
        return { 
                success: true, 
                redirectTo: "/verify-email" 
            };
        } catch (error) {
            set({ 
                error: error.response?.data?.message || "Hesap oluştururken bir hata oluştu", 
                isSigningUp: false, 
            });
            return { success: false };
        }
    },

    login: async (credentials) => {
        set({ isLoggingIn: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);

            // Email doğrulaması gerekiyorsa
        if (response.data.requiresVerification) {
            set({
                user: response.data.user,
                isAuthenticated: false,
                isLoggingIn: false,
                error: null
            });
            return {
                requiresVerification: true,
                email: response.data.email
            };
        }

        // Login başarılı ve email doğrulanmışsa
        if (response.data.success) {
            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoggingIn: false,
                error: null
            });
            return { success: true };
        }
            
        } catch (error) {
            set({ error: error.response?.data?.message || 'Giriş yaparken bir hata oluştu', isLoggingIn: false});

            throw error;
        }
    },
    logout: async () => {
        set({ isLoggingOut: true, error: null });
        try {
            await axios.post(`${API_URL}/logout`);
            set({ user: null, isAuthenticated: false, isLoggingOut: false, error: null });
        } catch (error) {
            set({error: "Çıkış yaparken bir hata oluştu", isLoggingOut: false});
        }
    },
    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/verify-email`, { code });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return response.data;
        } catch (error) {
            set({ error: error.response.data.message || "Doğrulama hatası", isLoading: false });
            throw error;
        }
    },
    authCheck: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/authCheck`);
            
            if (response.data.user) {
                // Kullanıcı var ama email doğrulanmamışsa
                if (!response.data.user.isVerified) {
                    set({ 
                        user: response.data.user,
                        isAuthenticated: false, // Email doğrulanmadığı için authenticated false
                        isCheckingAuth: false,
                        error: "Email doğrulanmamış"
                    });
                    return { success: false, redirectTo: "/verify-email" };
                }
    
                // Kullanıcı var ve email doğrulanmışsa
                set({ 
                    user: response.data.user, 
                    isAuthenticated: true,
                    isCheckingAuth: false,
                    error: null
                });
                return { success: true };
            } else {
                // Kullanıcı yoksa
                set({ 
                    user: null, 
                    isAuthenticated: false, 
                    isCheckingAuth: false,
                    error: null
                });
                return { success: false };
            }
        } catch (error) {
            set({ 
                error: error.response?.data?.message || 'Bir hata oluştu', 
                isCheckingAuth: false, 
                isAuthenticated: false, 
                user: null 
            });
            return { success: false, error: error.response?.data?.message };
        }
    },
    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, { email });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || "Şifre sıfırlama hatası", isLoading: false });
            throw error;
        }
    },
    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || "Şifre sıfırlama hatası", isLoading: false });
            throw error;
        }
    },
}));