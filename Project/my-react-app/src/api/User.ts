import { z } from "zod";
import { API_BASE_URL } from "./config";
import { validateResponse } from "./validateResponse";

/**
 * Валидация для данных из LoginForm (для авторизации)
 */
export const UserLogSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type UserLog = z.infer<typeof UserLogSchema>;

/**
 * Валидация для данных из RegisterForm (для создания нового аккаунта)
 */
export const UserRegSchema = z.object({
  email: z.string().email("Пожалуйста, введите корректный емэйл"),
  password: z.string().min(8, "Минимальная длина пароля - 8 символов"),
  name: z.string().min(3, "Минимальная длина имени - 3 символов"),
  surname: z.string().min(3, "Минимальная длина фамилии - 3 символов"),
  confirmPassword: z.string().min(8, "Минимальная длина пароля - 8 символов"),

}).refine((data)=>data.password===data.confirmPassword,{
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});
export type UserReg = z.infer<typeof UserRegSchema>;
/**
 * Валидация для данных о пользователе
 */
export const UserProfileResponseSchema = z.object({
  favorites: z.array(z.string()).default([]), 
  surname: z.string().optional(), 
  name: z.string().optional(),    
  email: z.string().optional() 
});
export type UserProfileResponse = z.infer<typeof UserProfileResponseSchema>;

/**
 * Функция авторизации пользователей
 */
export function loginUser(data: UserLog) {
  const checkedData = UserLogSchema.parse(data);
  return fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(checkedData),
    credentials: 'include'
  })
    .then(validateResponse)
    .then(response => response.json()); 
}

/**
 * Функция регистрации пользователей
 */
export function registerUser(data: UserReg): Promise<{ token: string }> {
  const checkedData = UserRegSchema.parse(data);
  return fetch(`${API_BASE_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(checkedData),
    credentials: 'include'
  })
    .then(validateResponse)
    .then(response => response.json()); 
}

/**
 * Функция закрытия текущей пользовательской сессии
 */
export async function stopUser() {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include'
  })
    .then(validateResponse)
    .then((response) => response.json());
  return response;
}

/**
 * Функция получения данных о текущем авторизованном пользователе
 */
export async function getUser(): Promise<UserProfileResponse> {
  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include'
  });
  const data = await validateResponse(response);
  const result = await data.json();
  return UserProfileResponseSchema.parse(result);
}
