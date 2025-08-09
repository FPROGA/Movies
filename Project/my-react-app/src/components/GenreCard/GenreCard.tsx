import { genreImages } from "../../pages/utilus/GenreImages";
import "./GenreCard.css";
interface GenreCardProps {
  genre: string;
}

export function GenreCard({genre}: GenreCardProps) {
  const imagePath = genreImages[genre.toLowerCase()];
  return (
    <div className="genre-container">
      <img className="genre-img" src={imagePath} />
      <div className="genre-title">{genre}</div>
    </div>
  );
}
