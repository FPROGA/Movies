import { MovieTypeResponse } from "../../api/Movie";
import PlugImage from "../../assets/plug.jpg";

import "./MovieCard.css";
interface MovieProps {
  movie: MovieTypeResponse;
}
export function MovieCard({ movie }: MovieProps) {
  const imageUrl = movie.posterUrl || movie.backdropUrl || PlugImage;
  return (
    <div className="movie-container">
      {imageUrl&& <img className="movie-img" src={imageUrl} /> } 
    </div>
  );
}
