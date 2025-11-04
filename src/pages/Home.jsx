import React, { useState } from "react";
import SearchBar from "../components/searchBar";

function Home () {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSearch = async(query) => {
        setLoading(true)
        setError(null)

        try {
            const res = await fetch(
                 `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&s=${query}`
            );
            const data = await res.json();

        }
    }
}