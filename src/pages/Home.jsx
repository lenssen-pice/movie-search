import React, { useState } from "react";
import SearchBar from "../components/searchBar";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);


  // wrap this in useCallBack function , other wise function will get re-render , currently useEffect is not there so fine
  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      //  separate out the api call function in other file  , not in jsx/tsx . 
      // it should only have ui logic and code
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=af462f28&s=${query}`
      );
      
      //  Should check if response is ok (res.ok) before parsing JSON
      // Network errors might return non-JSON responses causing parse errors
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
      //  Setting error object directly can cause issues when rendering
      // Should set error.message instead: setError(err.message || "Failed to fetch movies")
      setError(err);
    }
    //  Better to use finally block for setLoading(false) to ensure it always executes
    setLoading(false);
  };

  //  This could also benefit from useCallback for performance optimization
  // Prevents creating new function instances on every render
  const handleMovieClick = (movie) => {
    //  Remove console.log before production - use proper logging or remove debug statements
    console.log("movie", movie)
    setSelectedMovie(movie);
  };

  //  Should use useCallback here too
  // Example: const closeModal = useCallback(() => { setSelectedMovie(null); }, []);
  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

{/* loading and movie length are enough for this code block , un-necessary extra condition */}
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
