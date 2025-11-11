import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:6060",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Token Automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto Redirect if Token Invalid
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("role");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

// AUTH API
export const authAPI = {
  login: (data) => API.post("/api/v1/admin/login", data),
  register: (data) => API.post("/api/v1/admin/register", data),

  patientLogin: (data) => API.post("/api/v1/patients/login", data),
  patientSignup: (data) => API.post("/api/v1/patients/signup", data),
  doctorLogin: (data) => API.post("/api/doctors/login", data),
  sendResetLink: (data) => API.post("/api/auth/send-reset-link", data),
  resetPassword: (data) => API.post("/api/auth/reset-password", data),

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("doctorId");
    localStorage.removeItem("patientId");
  },
};

// PATIENT API
export const patientAPI = {
  getAll: () => API.get("/api/v1/patients"),
  getById: (id) => API.get(`/api/v1/patients/${id}`),
  add: (data) => API.post("/api/v1/patients", data),
  update: (id, data) => API.put(`/api/v1/patients/${id}`, data),
  delete: (id) => API.delete(`/api/v1/patients/${id}`),
};


// DOCTOR API
export const doctorAPI = {
  getAll: () => API.get("/api/doctors"),
  getById: (id) => API.get(`/api/doctors/${id}`),
  add: (data) => API.post("/api/doctors", data),
  update: (id, data) => API.put(`/api/doctors/${id}`, data),
  delete: (id) => API.delete(`/api/doctors/${id}`),
};
// APPOINTMENT API
export const appointmentAPI = {
  create: (data) => API.post("/api/appointments", data),
  getForDoctor: (doctorId) => API.get(`/api/appointments/doctor/${doctorId}`),
  getForPatient: (email) => API.get(`/api/appointments/patient/${email}`),
  getAll: () => API.get("/api/appointments"),
  cancel: (id) => API.put(`/api/appointments/${id}/cancel`),
};

export const medicalAPI = {
  create: (data) => API.post("/api/medical-records", data),

  getByPatient: (patientId) => API.get(`/api/medical-records/patient/${patientId}`),
};


export default API;
