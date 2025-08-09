
import { Link } from "react-router-dom";
import { GenreCard } from "../../components/GenreCard/GenreCard";
import "./GenresPage.css";
import { genreImages } from "../utilus/GenreImages";

export function GenresPage() {
  return (
    <div className="genre-page">
      <h1>Жанры фильмов</h1>
      <ul className="genre-list">
        {Object.keys(genreImages).map((genre) => (
          <Link to={`/movie/genres/${genre}`} key={genre}>
            <li key= {genre} className="genre-card">
              <GenreCard genre={genre} />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
