import { Link } from "react-router-dom";
import { MovieCard } from "../../../components/Moviecard/MovieCard";
import { useGetFav } from "../../../hooks/Fav/useGetFav";
import "./FetchFavouriteMovies.css";
import { CloseButton } from "../../../components/Buttons/CloseButton";
import { useDeleteFromFav } from "../../../hooks/Fav/useDeleteFromFav";
import { Loader } from "../../../components/Loader";


export function FetchFavouriteMovies() {
  const query = useGetFav();
  const { mutate: deleteFromFav } = useDeleteFromFav();

  const handleRemove = (movieId: number) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      deleteFromFav(movieId);
    };
  };

  if (query.isLoading) return <Loader/>;
  if (query.error) return <div>Error loading favorites</div>;
  if (!query.data?.length) return <div>No favorites yet</div>;

  return (
    <div className="favourite-movies">
      <ul className="fav-list">
        {query.data.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <li className="fav-card">
              <CloseButton className="close-button" onClick={handleRemove(movie.id)} />
              <MovieCard movie={movie} />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}