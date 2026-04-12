import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:8080/api'; // Standard Android emulator localhost shortcut

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  sendOtp: (mobile: string) => api.post('/auth/send-otp', { mobile }),
  verifyOtp: (mobile: string, otp: string) => api.post('/auth/verify-otp', { mobile, otp }),
};

export const mixService = {
  calculate: (items: any[]) => api.post('/mix/calculate', { items }),
  getIngredients: () => api.get('/ingredients'),
};

export const partnerService = {
  getPartners: (type?: string) => api.get('/partners', { params: { type } }),
};

export const orderService = {
  placeOrder: (data: any) => api.post('/orders', data),
  getOrder: (id: number) => api.get(`/orders/${id}`),
  uploadVideo: (orderId: number, formData: FormData) => 
    api.post(`/media/upload/${orderId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  uploadPhoto: (orderId: number, formData: FormData) => 
    api.post(`/media/upload-photo/${orderId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
};

export const notificationService = {
  getNotifications: (userId: number) => api.get(`/notifications/${userId}`),
};

export const subscriptionService = {
  create: (data: any) => api.post('/subscriptions', data),
  getUserSubscriptions: (userId: number) => api.get(`/subscriptions/user/${userId}`),
};

export default api;
