import React from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

export default function HeaderGoBack() {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ boxShadow: 'none', backgroundColor: '#fff', width: '100%', top: 0 }}>
                <Toolbar>
                    <ArrowBackIcon
                        style={{ color: '#3C3C3C' }}
                        onClick={() => navigate('/chats')}
                    />
                </Toolbar>
            </AppBar>
        </Box>
    );
}
