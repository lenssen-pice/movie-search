import React, { useState } from "react";
import "./SearchBar.css"

// CODE REVIEW: Consider adding debouncing to avoid excessive API calls on every keystroke
// You could use a library like 'lodash.debounce' or implement a custom debounce hook
// This would improve performance and reduce API costs
function SearchBar({ onSearch }) {

  //  try to use debounce on component , and  make this as auto compelete search , so as soon you type movies card should be shown
  //  that is also better practice


  // setQuery type of variables should be camel case only
  const [query, SetQuery] = useState("");

  // on auto complete these will not be required
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
