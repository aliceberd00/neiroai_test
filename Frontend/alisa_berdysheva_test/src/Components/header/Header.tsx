import React, { useState } from 'react';
import { AppBar, Box, Button, Toolbar, Typography, Menu, MenuItem, Paper } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import { logoutUserAsync } from '../../asyncActions/logout';
import LoginIcon from '@mui/icons-material/Login';

export default function Header() {
    const dispatch = useAppDispatch();
    const userEmail = useAppSelector((state) => state.user.email);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const navigate = useNavigate();

    function f_logout() {
        dispatch(logoutUserAsync());
        setTimeout(() => {
            navigate('/');
        }, 1000);
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setMenuOpen(false);
    };

    const handleNavigate = (path: string) => () => {
        navigate(path);
        handleClose(); // Close the menu after navigation
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ backgroundColor: '#3C3C3C', width: '100%' }}>
                    {userEmail && (
                        <Button
                            aria-controls={menuOpen ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={menuOpen ? 'true' : undefined}
                            disableElevation
                            onClick={handleClick}
                        >
                            <DehazeIcon
                                sx={{ color: '#fff' }}
                                viewBox="0 0 20 20"
                                fontSize="large"
                            />
                        </Button>
                    )}

                    <NavLink
                        style={{ textDecoration: 'none', color: '#fff', fontSize: '32px', fontFamily: 'Raleway' }}
                        to="/"
                    >
                        Simple app
                    </NavLink>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {/* Optional text or remove Typography */}
                    </Typography>

                    <Menu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={menuOpen}
                        onClose={handleClose}
                    >
                        <Paper sx={{ maxWidth: '100%' }}>
                            <MenuItem>
                                <ListItemIcon>
                                    <PersonIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={userEmail}
                                    sx={{ color: 'black', fontFamily: 'Outfit' }}
                                />
                            </MenuItem>
                            <MenuItem onClick={handleNavigate('/chats')} disableRipple>
                                Chats
                            </MenuItem>
                            <MenuItem onClick={f_logout} disableRipple>
                                <ListItemIcon>
                                    <LoginIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Log out"
                                    sx={{ color: 'black', fontFamily: 'Outfit' }}
                                />
                            </MenuItem>
                        </Paper>
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
