import React from 'react'
import {IconFileSearch} from "@tabler/icons-react"
import "../dist/SearchInputModule.css"
const SearchInput = ({fieldSearchedBy}) => {
  return (
    <>
    <div className='search-container'>
        <div className='search-input'>
            <input type='text' className='search-input__text' placeholder={`Chercher Par -${fieldSearchedBy}-`}></input>
        </div>
        <div className='search-button'>
            <button >
                <IconFileSearch className='search-icon'/>Rechercher
            </button>
        </div>
    </div>
    </>
  )
}

export default SearchInput