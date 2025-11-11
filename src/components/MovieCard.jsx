import React from "react";
import "./MovieCard.css";
import placeholder from "../assets/placeholder.jpg";

const MovieCard = ({ movie, onClick }) => {
  // Use strict equality (!==) instead of loose equality (!=)
  const poster =
    movie.Poster && movie.Poster != "N/A" ? movie.Poster : placeholder;

  return (
    <div className="movie-card" onClick={onClick}>
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
      {/* alt attribute */}
      <img src={poster} />
    </div>
  );
};

export default MovieCard;
