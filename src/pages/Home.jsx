import React, { useState } from "react";
import SearchBar from "../components/searchBar";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=af462f28&s=${query}`
      );
      const data = await res.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else if (data.error === "Movie not found") {
        setMovies([]);
        setError("Movie not found");
      } else {
        setError("Something went wrong");
      }
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const handleMovieClick = (movie) => {
    console.log("movie", movie)
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && movies.length > 0 && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={() => handleMovieClick(movie)}
            />
          ))}   
        </div>
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default Home;
