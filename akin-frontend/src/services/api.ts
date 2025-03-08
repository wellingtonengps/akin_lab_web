import type { User } from "@/types/user";
import axios from "axios";

/*// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token"); // Pegue o token do localStorage ou outra fonte
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
*/

const api = axios.create({
  baseURL: "http://localhost:8080", // Defina a baseURL separadamente
});

export const getUsers = async (token: string): Promise<User[]> => {
  try {
    const response = await api.get<User[]>("/user/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};

export const loginUser = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
    const response = await api.post("/authenticate/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};
