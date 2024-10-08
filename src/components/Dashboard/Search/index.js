import React from "react";
import "./styles.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

function SearchBar({ search, onSearchChange }) {
  
  return (
    <div className="search-flex">
      <SearchRoundedIcon />
      <input
        type="text"
        placeholder="Seacrh"
        value={search}
        onChange={(e) => onSearchChange(e)}
      />
    </div>
  );
}

export default SearchBar;
