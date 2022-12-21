import React, { useContext, useState } from 'react';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import StarBorder from '@mui/icons-material/StarBorder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MovieIcon from '@mui/icons-material/Movie';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import CodeIcon from '@mui/icons-material/Code';
import GroupsIcon from '@mui/icons-material/Groups';
import CategoryIcon from '@mui/icons-material/Category';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StyleIcon from '@mui/icons-material/Style';

import { globalContext } from './contexts/globalContext';
import { Link, useNavigate } from 'react-router-dom';

const categories = [
  {
    content: 'Movies',
    icon: <MovieIcon />,
  },
  {
    content: 'Games',
    icon: <VideogameAssetIcon />,
  },
  {
    content: 'Series',
    icon: <LocalMoviesIcon />,
  },
  {
    content: 'Development',
    icon: <CodeIcon />,
  },
  {
    content: 'Society',
    icon: <GroupsIcon />,
  },
];

export default function SideBar() {
  const { isSideBarOpen, setIsSideBarOpen } = useContext(globalContext);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div
      className={
        isSideBarOpen ? 'sidebar__menu_wrapper active' : 'sidebar__menu_wrapper'
      }
      onClick={() => {
        setIsSideBarOpen(false);
      }}
    >
      <div
        className="sidebar__menu"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <List>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText>Categories</ListItemText>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {categories.map((category, index) => {
                return (
                  <ListItemButton
                    key={index}
                    onClick={() => {
                      navigate(
                        `/reviews/category/${category.content.toLowerCase()}`
                      );
                      setIsSideBarOpen(false);
                    }}
                    sx={{ pl: 4 }}
                    style={{ color: '#252525' }}
                  >
                    <ListItemIcon>{category.icon}</ListItemIcon>
                    <ListItemText primary={category.content} />
                  </ListItemButton>
                );
              })}
            </List>
          </Collapse>

          <ListItemButton
            onClick={() => {
              navigate('/reviews/tags');
              setIsSideBarOpen(false);
            }}
            style={{ color: '#252525' }}
          >
            <ListItemIcon>
              <StyleIcon />
            </ListItemIcon>
            <ListItemText>Tags</ListItemText>
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              navigate('/new');
              setIsSideBarOpen(false);
            }}
            style={{ color: '#252525' }}
          >
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText>New post</ListItemText>
          </ListItemButton>
        </List>
      </div>
    </div>
  );
}
