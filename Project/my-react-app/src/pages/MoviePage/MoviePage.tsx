import { getIDMovie } from "../../api/Movie";
import { Button } from "../../components/Buttons";
import iconImage from "../../assets/star.png";
import "./MoviePage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { Loader } from "../../components/Loader";
import { getRatingColor } from "../utilus/getRationgColor";
import PlugImage from "../../assets/plug.jpg";
import hurtIcon from "../../assets/hurtIcon.png";
import hurtIconPressed from "../../assets/hurtIconPressed.png";
import { useState } from "react";
import { useAddToFav } from "../../hooks/Fav/useAddToFav";
import { useDeleteFromFav } from "../../hooks/Fav/useDeleteFromFav";
import { useSelector } from "react-redux";
import { RootState } from "../../features/auth/store";
function MoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);
  const { mutate: addToFavMutation } = useAddToFav();
  const { mutate: deleteFromFavMutation } = useDeleteFromFav();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const hurtImage = isFav ? hurtIconPressed : hurtIcon;
  const movieQuery = useQuery(
    {
      queryFn: () => getIDMovie(Number(id)),
      queryKey: ["movie", id],
    },
    queryClient
  );

  switch (movieQuery.status) {
    case "pending":
      return <Loader />;
    case "error":
      return (
        <div>
          <span>Произошла ошибка </span>
          <button onClick={() => movieQuery.refetch()}>
            Попробовать еще раз
          </button>
        </div>
      );
    case "success":
      const movie = movieQuery.data;
      let color: string = "";
      if (movie.tmdbRating) {
        color = getRatingColor(movie.tmdbRating);
      }
      const imageUrl = movie.posterUrl || movie.backdropUrl || PlugImage;
      const addToFav = () => {
        if (!isAuthenticated) {
          navigate("/login");
          return;
        }
        isFav ? setIsFav(false) : setIsFav(true);
        if (isFav) {
          setIsFav(false);
          deleteFromFavMutation(movie.id);
        } else {
          setIsFav(true);
          addToFavMutation(movie.id);
        }
      };
      return (
        <div className="movie-page">
          <div className="firstPage">
            <div className="first-info">
              <div className="first-container">
                <div className="rating" style={{ backgroundColor: color }}>
                  <img src={iconImage} className="rating-img" />
                  {movie.tmdbRating && movie.tmdbRating.toFixed(1)}
                </div>
                <h4>{movie.releaseYear && movie.releaseYear}</h4>
                <h4>{movie.genres && movie.genres[0]}</h4>
                <h4>
                  {movie.runtime &&
                    `${Math.floor(movie.runtime / 60)} ч ${
                      movie.runtime % 60
                    } мин`}
                </h4>
              </div>
              <h1>{movie.title}</h1>
              <h3>{movie.plot}</h3>
              <div className="buttons">
                <Button
                  className="button-trailer"
                  onClick={() => {
                    movie.trailerUrl && window.open(movie.trailerUrl, "_blank");
                  }}
                >
                  Трейлер
                </Button>
                <Button
                  kind="secondary"
                  className="button-favourites"
                  onClick={addToFav}
                >
                  <img className="hurtImage" src={hurtImage} />
                </Button>
              </div>
            </div>
            {imageUrl && (
              <div className="poster-container">
                <img className="movie-poster" src={imageUrl}></img>
              </div>
            )}
          </div>
          <div className="secondPage">
            <h2>О фильме</h2>
            {movie.language !== "" && (
              <p>Язык оригинала...............{movie.language}</p>
            )}
            {Number(movie.budget) !== 0 && (
              <p>Бюджет...............{`${movie.budget} руб.`}</p>
            )}
            {Number(movie.revenue) !== 0 && (
              <p>Выручка...............{`${movie.revenue} руб.`}</p>
            )}
            {movie.director !== null && (
              <p>Режиссер...............{movie.director}</p>
            )}
            {movie.production !== null && (
              <p>Продакшен...............{movie.production}</p>
            )}
            {movie.awardsSummary !== null && (
              <p>Награды...............{movie.awardsSummary}</p>
            )}
          </div>
        </div>
      );
  }
}

export default MoviePage;
