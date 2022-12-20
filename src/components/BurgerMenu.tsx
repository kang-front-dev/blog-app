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

export default function BurgerMenu() {
  const { isBurgerOpen,setIsBurgerOpen } = useContext(globalContext);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className={isBurgerOpen ? 'burger__menu_wrapper active' : 'burger__menu_wrapper'} onClick={()=>{setIsBurgerOpen(false)}}>
      <div className='burger__menu' onClick={(e)=>{e.stopPropagation()}}>
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
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <MovieIcon />
                </ListItemIcon>
                <ListItemText primary="Movies" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <VideogameAssetIcon />
                </ListItemIcon>
                <ListItemText primary="Games" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <LocalMoviesIcon />
                </ListItemIcon>
                <ListItemText primary="Series" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <CodeIcon />
                </ListItemIcon>
                <ListItemText primary="Development" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <GroupsIcon />
                </ListItemIcon>
                <ListItemText primary="Society" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton>
            <ListItemIcon>
              <StyleIcon />
            </ListItemIcon>
            <ListItemText>Tags</ListItemText>
          </ListItemButton>
          <ListItemButton>
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
