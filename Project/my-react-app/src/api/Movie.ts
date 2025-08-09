import {z} from "zod";
import { API_BASE_URL } from "./config";
import { validateResponse } from "./validateResponse";

/**
 * Схема валидации фильма
 */
const MoviePropsSchema = z.object({
    count: z.number().optional().default(50),
    page: z.number().optional().default(1),
    title: z.string().optional(),
    genre: z.string().optional()
});
export type MoviePropsType = z.infer<typeof MoviePropsSchema>;

/**
 * Схема валидации фильма получаемых с сервера
 */
const MovieSchema = z.object({
    keywords: z.array(z.string()).optional(),
    backdropUrl: z.string().nullable(),
    production: z.string().nullable(),
    trailerYouTubeId: z.string().nullable(),
    language: z.string().nullable(),
    tmdbRating: z.number().nullable(),
    title: z.string(),
    cast: z.array(z.string()).nullable().optional(),
    revenue: z.string().nullable(),
    posterUrl: z.string().nullable(),
    plot: z.string().nullable(),
    genres: z.array(z.string()).optional(),
    id: z.number(),
    budget: z.string().nullable(),
    languages: z.array(z.string()).optional(),
    releaseDate: z.string().nullable(),
    director: z.string().nullable(),
    awardsSummary: z.string().nullable(),
    runtime: z.number().nullable(),
    trailerUrl: z.string().nullable(),
    releaseYear: z.number().nullable(),
    countriesOfOrigin: z.array(z.string()).optional(),
    originalTitle: z.string().nullable(),
    searchL: z.string().nullable(),
    homepage: z.string().nullable(),
    status: z.string().nullable(),
});
export type MovieTypeResponse = z.infer<typeof MovieSchema>;

/**
 * Схема валидации массива фильмов получаемых с сервера
 */
export const MoviesResponseSchema = z.array(MovieSchema);
export type MoviesResponse = z.infer<typeof MoviesResponseSchema>;

const GenresSchema = z.array(z.string());
export type GenresResponse = z.infer<typeof GenresSchema>;

/**
 * Функция получения фильмов по заданным жанрам
 */
export async function getMovies(
  props: MoviePropsType
): Promise<MoviesResponse>  {
  const { count, page, title, genre } = MoviePropsSchema.parse(props);
  const url = new URL(`${API_BASE_URL}/movie`);
  url.searchParams.append('count', count.toString());
  url.searchParams.append('page', page.toString());
  if(title) url.searchParams.append('title', title);
  if(genre) url.searchParams.append('genre', genre);
  const response = await fetch(`${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
    
  })
  const data = await validateResponse(response);
  const result = await data.json();
  return MoviesResponseSchema.parse(result);
}


/**
 * Функция получения 10 фильмов с наивысшим рейтингом
 */
export async function get10Movies(): Promise<MoviesResponse>  {
  const response = await fetch(`${API_BASE_URL}/movie/top10`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
    
  })
  const data = await validateResponse(response);
  const result = await data.json();
  return MoviesResponseSchema.parse(result);
}


/**
 * Функция получения жанров
 */
export async function getGenres(): Promise<GenresResponse>  {
  const response = await fetch(`${API_BASE_URL}/movie/genres`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
    
  })
  const data = await validateResponse(response);
  const result = await data.json();
  return GenresSchema.parse(result);
}

/**
 * Функция получения фильма по id
 */
export async function getIDMovie(id : number): Promise<MovieTypeResponse>  {
  const url = `${API_BASE_URL}/movie/${id}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
    
  })
  const data = await validateResponse(response);
  const result = await data.json();
  return MovieSchema.parse(result);
}

/**
 * Функция получения рандомного фильма
 */
export async function getRandomMovie(): Promise<MovieTypeResponse>  {
  
  const response = await fetch(`${API_BASE_URL}/movie/random`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
    
  })
  const data = await validateResponse(response);
  const result = await data.json();
  return MovieSchema.parse(result);
}