import { useQuery } from "@tanstack/react-query";
import { get10Movies } from "../../../api/Movie";
import { queryClient } from "../../../api/queryClient";
import { Loader } from "../../../components/Loader";
import { MovieCard } from "../../../components/Moviecard/MovieCard";
import "./FetchTop10Movies.css";
import { Link } from "react-router-dom";

export const FetchTop10Movies = () => {
  const topMoviesQuery = useQuery(
    {
      queryFn: () => get10Movies(),
      queryKey: ["top"],
    },
    queryClient
  );

  switch (topMoviesQuery.status) {
    case "pending":
      return <Loader />;
    case "error":
      return (
        <div>
          <span>Произошла ошибка </span>
          <button onClick={() => topMoviesQuery.refetch()}>
            Попробовать еще раз
          </button>
        </div>
      );
    case "success":
      return (
        <ul className="movie-list">
          {topMoviesQuery.data.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id} >
            <li key={movie.id} className="movie-card">
              <MovieCard movie={movie}/>
            </li>
            </Link>
          ))}
        </ul>
      );
  }
};
