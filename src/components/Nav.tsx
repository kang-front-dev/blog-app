import React, { useContext } from 'react';
import NavSearch from './NavSearch';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { globalContext } from './contexts/globalContext';

export default function Nav() {
  const {navTitle} = useContext(globalContext)
  return (
    <div className="nav">
      <div className="container">
        <div className="nav_left">
          <IconButton>
            <MenuIcon sx={{fontSize: 30}} />
          </IconButton>
          <h2 className="nav_title">{navTitle}</h2>
        </div>
        <div className="nav_right">
          <NavSearch />
          <IconButton>
            <AccountCircleIcon sx={{fontSize: 30}} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
