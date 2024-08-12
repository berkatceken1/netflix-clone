import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';


export const useAuthStore = create((set) => ({ 
    user: null,
    isSigningUp: false,
    isCheckingAuth: true, // bu kısmı true yapmamızın sebebi, kullanıcı sayfayı ilk açtığında kullanıcı bilgileri kontrol edilirken, bu süreçte kullanıcıya bir yükleme ekranı göstermek istememiz
    isLoggingOut: false, 
    isLoggingIn: false, 

    signup: async (credentials) => {
        set({ isSigningUp: true });
        try {
            const response = await axios.post('/api/v1/auth/signup', credentials);
            set({ user: response.data.user, isSigningUp: false });
            toast.success('Hesabınız başarıyla oluşturuldu');
        } catch (error) {
            toast.error(error.response.data.message || 'Kayıt olurken bir hata oluştu');
            set({ isSigningUp: false, user: null});
            
        }
    },
    login: async (credentials) => {
        set({ isLoggingIn: true });
        try {
            const response = await axios.post('/api/v1/auth/login', credentials);
            set({ user: response.data.user, isLoggingIn: false });
            toast.success('Başarıyla giriş yaptınız');
        } catch (error) {
            set({ isLoggingIn: false, user: null});
            toast.error(error.response.data.message || 'Giriş yaparken bir hata oluştu');
        }
    },
    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axios.post('/api/v1/auth/logout');
            set({ user: null, isLoggingOut: false });
            toast.success('Başarıyla çıkış yaptınız');
        } catch (error) {
            toast.error(error.response.data.message || 'Çıkış yaparken bir hata oluştu');
        }
    },
    authCheck: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axios.get('/api/v1/auth/authCheck');
            set({ user: response.data.user, isCheckingAuth: false });
        } catch (error) {
            set({ isCheckingAuth: false, user: null});
            // toast.error(error.response.data.message || 'Bir hata oluştu');
        }
    },

}));