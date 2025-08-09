import { z } from "zod";
import { API_BASE_URL } from "./config";
import { MoviesResponse, MoviesResponseSchema } from "./Movie";
import { validateResponse } from "./validateResponse";

const UserFavSchema = z.object({
  favorites: z.array(z.string()).default([]), 
  surname: z.string().optional(), 
  name: z.string().optional(),    
  email: z.string().optional()   
});
export type UserFav = z.infer<typeof UserFavSchema>;


/**
 * Функция получения фильмов в избранном
 */
export async function getFavourites(): Promise<MoviesResponse> {
  const response = await fetch(`${API_BASE_URL}/favorites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include'
  });
  const data = await validateResponse(response);
  const result = await data.json();
  return MoviesResponseSchema.parse(result);
}
/**
 * Функция добавления фильма в избранное
 */
export function postFavouriteMovie(movieId: number): Promise<UserFav> {
  return fetch(`${API_BASE_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: movieId.toString() 
    }),
    credentials: "include"
  })
    .then(validateResponse)
    .then((response) => response.json())
    .then((result) => UserFavSchema.parse(result));
}

/**
 * Функция удаления фильма из избранного
 */
export function deleteFavouriteMovie(movieId: number): Promise<UserFav> {
  return fetch(`${API_BASE_URL}/favorites/${movieId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
        "Accept": "application/json"
    },
    credentials: "include"
  })
    .then((response) => validateResponse(response))
    .then((result) => result.json())
    .then((result) => UserFavSchema.parse(result));
}
