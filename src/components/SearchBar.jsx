import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, SetQuery] = useState("");
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim()) {
      onSearch(query);
    }
  };
  const handleClick = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (




    
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Movies"
        value={query}
        onChange={(e) => SetQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleClick}>Search</button>
    </div>
  );
}

export default SearchBar;
