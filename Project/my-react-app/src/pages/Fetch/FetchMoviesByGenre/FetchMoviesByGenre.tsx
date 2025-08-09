import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { queryClient } from "../../../api/queryClient";
import { getMovies, MoviesResponse } from "../../../api/Movie";
import { Loader } from "../../../components/Loader";
import { Button } from "../../../components/Buttons";
import { Link } from "react-router-dom";
import { MovieCard } from "../../../components/Moviecard/MovieCard";
import "./FetchMoviesByGenre.css";

interface FetchMoviesByGenreProps {
  genre: string;
  count: number;
  initialPage: number;
}
export function FetchMoviesByGenre({ genre, count, initialPage }: FetchMoviesByGenreProps) {
  const [page, setPage] = useState(initialPage);
  const [allMovies, setAllMovies] = useState<MoviesResponse>([]);
  const [hasMore, setHasMore] = useState(true);

  // 1. Запрос для получения фильмов
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["movies", genre, page],
    queryFn: () => getMovies({ genre, count, page }),
  }, queryClient);

  useEffect(() => {
    if (data) {
      setAllMovies(prev => [...prev, ...data]);
    
      if (data.length < count) {
        setHasMore(false);
      }
    }
  }, [data]);

  const loadMore = () => {
    setPage(prev => prev + 1); 
  };

 
  if (isLoading && page === initialPage) {
    return <Loader />; 
  }

  if (isError) {
    return (
      <div>
        Ошибка загрузки
        <button onClick={()=>refetch()}>Повторить</button>
      </div>
    );
  }

  return (
    <div className="moviesByGenre">
      {/* 4. Показываем все загруженные фильмы */}
      <ul className="movie-list-genre">
        {allMovies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </ul>

      <div className="but-container">
      {hasMore && (
        <Button onClick={loadMore} >
          {isLoading ? "Загрузка..." : "Показать еще"}
        </Button>
      )}
      </div>
    </div>
  );
}


 