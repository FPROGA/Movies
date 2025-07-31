import {z} from "zod";
import { API_BASE_URL } from "./config";
import { validateResponse } from "./validateResponse";

/**
 * Схема валидации фильма
 */
const MoviePropsSchema = z.object({
    сount: z.number().default(50),
    page: z.number().default(1),
    title: z.string(),
    genre: z.string()
});
export type MoviePropsType = z.infer<typeof MovieSchema>;

/**
 * Схема валидации фильма получаемых с сервера
 */
const MovieSchema = z.object({
    keywords: z.array(z.string()),
    backdropUrl: z.string(),
    production: z.string(),
    trailerYoutubeId: z.string(),
    language: z.string(),
    tmdbRating: z.number(),
    title: z.string(),
    cast: z.array(z.string()),
    revenue: z.string(),
    posterUrl: z.string(),
    plot: z.string(),
    genres: z.array(z.string()),
    id: z.number(),
    budget: z.string(),
    languages: z.array(z.string()),
    releaseDate: z.string(),
    director: z.string(),
    awardsSummary: z.string(),
    runtime: z.number(),
    trailerUrl: z.string(),
    releaseYear: z.number(),
    countriesOfOrigin: z.array(z.string()),
    originalTitle: z.string(),
    searchL: z.string(),
    homepage: z.string(),
    status: z.string(),
});
export type MovieTypeResponse = z.infer<typeof MovieSchema>;

/**
 * Схема валидации массива фильмов получаемых с сервера
 */
const MoviesResponseSchema = z.array(MovieSchema);
export type MoviesResponse = z.infer<typeof MoviesResponseSchema>;

/**
 * Функция получения фильмов
 */
export async function getMovies(
  props: MoviePropsType
): Promise<MoviesResponse>  {
  const { сount, page, title, genre } = MoviePropsSchema.parse(props);
  const url = new URL(`${API_BASE_URL}/movie`);
  url.searchParams.append('count', сount.toString());
  url.searchParams.append('page', page.toString());
  url.searchParams.append('title', title);
  url.searchParams.append('genre', genre);
  const response = await fetch(`url`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
    
  })
  const data = await validateResponse(response);
  const result = await data.json();
  console.log('Raw response:', await response.text());
  return MoviesResponseSchema.parse(result);
}

