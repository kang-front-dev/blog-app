import React from 'react';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

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
import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';

import { useNavigate } from 'react-router-dom';
import { useSideBar } from '../hooks/useSidebar';

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
  const { isSideBarOpen, handleSideBarClose } = useSideBar();
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
        handleSideBarClose();
      }}
    >
      <div
        className="sidebar__menu"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <List>
          <ListItemButton
            onClick={() => {
              navigate('/category/popular');
              handleSideBarClose();
            }}
          >
            <ListItemIcon>
              <AutoGraphOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Most Popular</ListItemText>
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              navigate('/category/recent');
              handleSideBarClose();
            }}
          >
            <ListItemIcon>
              <AccessTimeOutlinedIcon />
            </ListItemIcon>
            <ListItemText>Recent</ListItemText>
          </ListItemButton>

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
                      navigate(`/category/${category.content.toLowerCase()}`);
                      handleSideBarClose();
                    }}
                    sx={{ pl: 4 }}
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
              navigate('/tags');
              handleSideBarClose();
            }}
          >
            <ListItemIcon>
              <StyleIcon />
            </ListItemIcon>
            <ListItemText>Tags</ListItemText>
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              navigate('/new');
              handleSideBarClose();
            }}
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
