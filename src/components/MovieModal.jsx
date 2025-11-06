import React, { useState, useEffect } from "react";
import "./MovieModal.css";

const MovieModal = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=af462f28&i=${movie.imdbID}`
        );
        const data = await res.json();
        if (data.Response === "True") {
          setDetails(data);
        } else {
          setError("Failed to load details");
        }
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movie]);

  return (
    <div className="movie-modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {loading ? (
          <div className="shimmer">
            <div className="wrapper">
              <div className="stroke animate title"></div>
              <div className="stroke animate year"></div>
              <div className="stroke animate genre"></div>
              <div className="stroke animate director"></div>
            </div>
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : details ? (
          <>
            <h2>{details.Title}</h2>
            <p>
              <b>Year:</b> {details.Year}
            </p>
            <p>
              <b>Genre:</b> {details.Genre}
            </p>
            <p>
              <b>Director:</b> {details.Director}
            </p>
            <p>
              <b>Plot:</b> {details.Plot}
            </p>
          </>
        ) : null}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MovieModal;
