import React from 'react';
import './SearchBar.css';

export const SearchBar = ({ 
  placeholder = "Buscar...", 
  value, 
  onChange,
  onKeyPress, // ← Agrega esto
  className = ""
}) => {
  return (
    <div className={`search-bar ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress} // ← Agrega esto
        className="search-bar__input"
      />
      <span className="search-bar__icon">🔍</span>
    </div>
  );
};
export default SearchBar;