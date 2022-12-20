import React, { useContext } from 'react';
import NavSearch from './NavSearch';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { globalContext } from './contexts/globalContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
  const { isAuth, userName, setIsBurgerOpen, isBurgerOpen } =
    useContext(globalContext);
  const navigate = useNavigate();
  const handleClick = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };
  return (
    <div className="nav">
      <div className="container">
        <div className="nav__left">
          <IconButton onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Link to="/" className="nav__logo">
            <img src={require('../assets/images/logo.png')} alt="" />
            <span className="nav__logo_text">FrontView</span>
          </Link>
        </div>
        <div className="nav__right">
          <NavSearch />
          <IconButton
            onClick={() => {
              if (isAuth) {
                navigate(`/profiles/${userName}`);
              } else {
                navigate('/login');
              }
            }}
          >
            <AccountCircleIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
