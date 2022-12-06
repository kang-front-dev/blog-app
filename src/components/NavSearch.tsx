import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

export default function NavSearch() {
  return (
    <div className='nav_search'>
      <SearchIcon/>
      <input type='text' placeholder='Search...' className='nav_search_input'/>
    </div>
  )
}
