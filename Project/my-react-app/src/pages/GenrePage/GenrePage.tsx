import { Link, useParams } from "react-router-dom";
import "./GenrePage.css";
import { FetchMoviesByGenre } from "../Fetch/FetchMoviesByGenre/FetchMoviesByGenre";
import backImage from "../../assets/back.png";

export function GenrePage() {
  const { genre } = useParams();
  if (!genre) {
    return <div>Жанр не указан</div>;
  }
  return (
    <div className="movie-bygenre">
      <div className="genre-name">
        <Link to="/movie/genres">
          <img className="backImage" src={backImage} />
        </Link>
        <h1>{genre}</h1>
      </div>
       <FetchMoviesByGenre genre={genre} count={10} initialPage={1} />
    </div>
  );
}
