import { MovieTypeResponse } from "../../api/Movie";
import { Button } from "../../components/Buttons";
import iconImage from "../../assets/Vector.png";
import "./MoviePage.css";

interface movieProps {
  movie: MovieTypeResponse;
}

function MoviePage({ movie }: movieProps) {
  console.log(movie.tmdbRating.toFixed());
  console.log( movie.awardsSummary);

  return (
    <div className="movie-page">
      <div className="firstPage">
        <div className="first-info">
          <div className="first-container">
            <div className="rating">
              <img src={iconImage} className="rating-img" />
              {movie.tmdbRating.toFixed(1)}
            </div>
            <h4>{movie.releaseYear}</h4>
            <h4>{movie.genres[0]}</h4>
            <h4>{`${Math.floor(movie.runtime / 60)} ч ${
              movie.runtime % 60
            } мин`}</h4>
          </div>
          <h1>{movie.title}</h1>
          <h3>{movie.plot}</h3>
          <div className="buttons">
            <Button
              className="button-trailer"
              onClick={() => window.open(movie.trailerUrl, "_blank")}
            >
              Трейлер
            </Button>
          </div>
        </div>
        <img className="movie-poster" src={movie.posterUrl}></img>
      </div>
      <div className="secondPage">
        <h2>О фильме</h2>
        {movie.language !==  "" && (
          <p>Язык оригинала...............{movie.language}</p>
        )}
        {Number(movie.budget) !== 0 && (
          <p>Бюджет...............{`${movie.budget} руб.`}</p>
        )}
        {Number(movie.revenue) !== 0 && (
          <p>Выручка...............{`${movie.revenue} руб.`}</p>
        )}
        {movie.director !== "" && (
          <p>Режиссер...............{movie.director}</p>
        )}
        {movie.production !== "" && (
          <p>Продакшен...............{movie.production }</p>
        )}
        {movie.awardsSummary !== "" && (
          <p>Награды...............{movie.awardsSummary}</p>
        )}
        
      </div>
    </div>
  );
}

export default MoviePage;
