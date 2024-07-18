import React from 'react';
import { IconFileSearch } from "@tabler/icons-react";
import "../dist/SearchInputModule.css";

const SearchInput = ({ fieldSearchedBy, searchTerm, setSearchTerm, onSearch }) => {
  return (
    <>
      <div className='search-container'>
        <div className='search-input'>
          <input
            type='text'
            className='search-input__text'
            placeholder={`Chercher Par -${fieldSearchedBy}-`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onSearch();
              }}}
          />
        </div>
        <div className='search-button'>
          <button onClick={onSearch}>
            <IconFileSearch className='search-icon' /> Rechercher
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchInput;
