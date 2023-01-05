import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { globalContext } from './contexts/globalContext';
import NavSearch from './NavSearch';

import LinearProgress from '@mui/material/LinearProgress';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import Chip from '@mui/material/Chip';
import { logout } from './api/logout';

export default function Nav() {
  const {
    isAuth,
    setIsAuth,
    userName,
    setUserName,
    setUserEmail,
    setIsSideBarOpen,
    isSideBarOpen,
    progress,
    handleSnackbarOpen,
  } = useContext(globalContext);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dropdownOpen = Boolean(anchorEl);

  const setAnchor = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    setIsSideBarOpen(!isSideBarOpen);
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
          {isAuth ? (
            <Chip
              label={userName}
              style={{ color: '#FFFFFF', background: '#444444' }}
            />
          ) : null}
          <button className='nav__btn' onClick={setAnchor}>
            {localStorage.getItem('avatarImgPath') ? (
              <div
                className="nav__avatar"
                style={{
                  backgroundImage: `url(${localStorage.getItem(
                    'avatarImgPath'
                  )})`,
                }}
              ></div>
            ) : (
              <AccountCircleIcon />
            )}
          </button>
          <Menu
            className="nav__menu"
            anchorEl={anchorEl}
            open={dropdownOpen}
            onClose={handleDropdownClose}
          >
            <MenuItem
              onClick={() => {
                if (isAuth) {
                  navigate(`/profiles/${userName}`);
                } else {
                  navigate('/login');
                }
                handleDropdownClose();
              }}
            >
              <PersonOutlineIcon />
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (isAuth) {
                  navigate('/new');
                } else {
                  handleSnackbarOpen(
                    'error',
                    'You have to Sign In/Sign Up to create your posts'
                  );
                }
                handleDropdownClose();
              }}
            >
              <AddOutlinedIcon />
              Create post
            </MenuItem>
            {isAuth ? (
              <MenuItem
                onClick={async () => {
                  const response = await logout({ name: userName });
                  if (response.success) {
                    setIsAuth(false);
                    setUserName('');
                    setUserEmail('');
                    localStorage.removeItem('username');
                    localStorage.removeItem('email');
                    localStorage.removeItem('token');
                    localStorage.removeItem('avatarImgPath');
                  } else {
                    handleSnackbarOpen('error', response.message);
                  }
                  handleDropdownClose();
                }}
              >
                <LogoutIcon />
                Logout
              </MenuItem>
            ) : null}
          </Menu>
        </div>
      </div>
      <LinearProgress
        variant="determinate"
        className={
          progress === 0 || progress === 100
            ? 'nav__progress'
            : 'nav__progress active'
        }
        value={progress}
        style={{ position: 'fixed', top: '0', width: '100%' }}
      />
    </div>
  );
}
