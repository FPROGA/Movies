import { Link, useNavigate } from "react-router-dom";
import { MovieTypeResponse } from "../../api/Movie";
import iconImage from "../../assets/star.png";
import hurtIcon from "../../assets/hurtIcon.png";
import hurtIconPressed from "../../assets/hurtIconPressed.png";
import randomIcon from "../../assets/randomIcon.png";
import { Button } from "../../components/Buttons";
import "./MainPage.css";
import { FetchTop10Movies } from "../Fetch/FetchTop10Movies/FetchTop10Movies";
import { getRatingColor } from "../utilus/getRationgColor";
import PlugImage from "../../assets/plug.jpg";
import { useAddToFav } from "../../hooks/AddToFav/useAddToFav";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../features/auth/store";
import { useDeleteFromFav } from "../../hooks/AddToFav/useDeleteFromFav";


interface MovieProps {
  movie: MovieTypeResponse;
}
export function MainPage({ movie }: MovieProps) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);
  const { mutate: addToFavMutation } = useAddToFav();
  const {mutate: deleteFromFavMutation} = useDeleteFromFav();

  const addToFav = () => {
    if(!isAuthenticated){
      navigate('/login');
      return;
    }
    isFav? setIsFav(false): setIsFav(true);
    if(isFav){
      setIsFav(false);
      deleteFromFavMutation(movie.id);
    }
    else{
      setIsFav(true);
      addToFavMutation(movie.id);
    }
  };

  const hurtImage = isFav ? hurtIconPressed : hurtIcon;
  let color: string = "";
  if (movie.tmdbRating) {
    color = getRatingColor(movie.tmdbRating);
  }
  const imageUrl = movie.posterUrl || movie.backdropUrl || PlugImage;
  return (
    <div className="moviePage">
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
                `${Math.floor(movie.runtime / 60)} ч ${movie.runtime % 60} мин`}
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
            <Link to={`/movie/${movie.id}`}>
              <Button kind="secondary" className="button-about">
                О фильме
              </Button>
            </Link>
            <Button
              kind="secondary"
              className="button-favourites"
              onClick={addToFav}
            >
              <img className="hurtImage" src={hurtImage} />
            </Button>
            <Button
              kind="secondary"
              className="button-random"
              onClick={() => window.location.reload()}
            >
              <img className="randomImage" src={randomIcon} />
            </Button>
          </div>
        </div>
        {imageUrl && (
          <div className="poster-container">
            <img className="movie-poster" src={imageUrl}></img>
          </div>
        )}
      </div>
      <h2>Топ 10 фильмов</h2>
      <FetchTop10Movies />
    </div>
  );
}
