import React, { useState, useEffect } from "react";
import "./MovieModal.css";

const MovieModal = ({ movie, onClose }) => {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // same here , use api call logics in other files not in same file . call them here for clean code
  useEffect(() => {
    //  Same issue - API key should be in environment variables
    // Use import.meta.env.VITE_OMDB_API_KEY instead
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
        //  Consider catching the error parameter and logging it for debugging
        // catch (error) { console.error(error); setError(...) }
        setError("Something went wrong");
      } finally {
        // CODE REVIEW: Good use of finally block here! 👍
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movie]); // Dependency is correct, but could be more specific: [movie.imdbID]

  return (

    <div className="movie-modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {loading ? (
          //  make them as separeate components and use them here 
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
             {/* make them as separeate components and use them here same for this  */}
          
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
