import React from "react";

const MovieCard = ({ movie, onclick }) => {
  return (
    <div className="movie-card" onclick={onclick}>
      {movie.poster && movie.poster !== "N/A" && (
        <img src="{movie.poster}" alt="movie.title" />
      )}
      <h3>movie.title</h3>
      <p>movie.year</p>
    </div>
  );
};

export default MovieCard;
