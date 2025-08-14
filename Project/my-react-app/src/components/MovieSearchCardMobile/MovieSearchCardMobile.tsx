import { getRatingColor } from "../../pages/utilus/getRationgColor";
import "./MovieSearchCardMobile.css"
import plugImage from "../../assets/plug.jpg";
import iconImage from "../../assets/star.png";
import { MovieTypeResponse } from "../../api/Movie";


export interface MovieSearchCardProps {
  movie: MovieTypeResponse;
}

export function MovieSearchCardMobile({ movie }: MovieSearchCardProps){
    let color: string = "";
  if (movie.tmdbRating) {
    color = getRatingColor(movie.tmdbRating);
  }
  const movieImage = movie.posterUrl || movie.backdropUrl || plugImage;
  return (
    <div className="movie-search-card-mobile">
      <img className="movie-image-mobile" src={movieImage} />
      <div className="movie-info-search">
        <div className="first-container-search">
          <div className="rating-search" style={{ backgroundColor: color }}>
            <img src={iconImage} className="rating-img" />
            {movie.tmdbRating && movie.tmdbRating.toFixed(1)}
          </div>
          <h4 className="search">{movie.releaseYear && movie.releaseYear}</h4>
          <h4 className="search">{movie.genres && movie.genres[0]}</h4>
          <h4 className="search">
            {movie.runtime &&
              `${Math.floor(movie.runtime / 60)} ч ${movie.runtime % 60} мин`}
          </h4>
        </div>
        <div className="title">
            {movie.title}
        </div>
      </div>
    </div>
  );
}