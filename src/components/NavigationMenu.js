import React, { useState } from 'react';
import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from '@mui/material';
import ReactLogo from '../Images/logo512.png';
import { Link } from 'react-router-dom';
import Logout from '@mui/icons-material/Logout';
import { DataNavigation } from '../helpers/NavigationData';
const NavigationMenu = ({ isToken, handleLogin }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = !!anchorEl;
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box>
        <Tooltip title="Account">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} src={ReactLogo}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isToken &&
          DataNavigation.map((el) => {
            return (
              <MenuItem key={el.id} component={Link} to={el.to}>
                <ListItemIcon>{el.Icon}</ListItemIcon> {el.articleName}
              </MenuItem>
            );
          })}
        <Divider />
        <MenuItem onClick={handleLogin}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {isToken ? 'logout' : 'login'}
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavigationMenu;
