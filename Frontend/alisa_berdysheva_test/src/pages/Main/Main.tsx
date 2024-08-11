import React from 'react';
import { CssBaseline, Box, Typography, Button } from "@mui/material";
import {NavLink} from "react-router-dom";

export default function MainPage() {
    return(
        <>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                }}
            >
                <Typography style={{fontWeight: 500, textAlign: 'center', fontFamily:'Raleway', marginTop:'2em'}}
                            variant='h2'> Welcome </Typography>
                <Typography style={{ textAlign: 'center', fontFamily:'Raleway'}}>
                    We're thrilled to have you here!
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        marginTop: 2
                    }}
                >
                    <Button sx={{ borderRadius: '12px', background: '#D9B3F8', paddingX: 4}}
                        variant="contained"
                    >
                        <NavLink to='/login' style={{ fontFamily: 'Raleway', textTransform: 'capitalize',
                            color: '#fff', textDecoration:'none'}}>
                            Login
                        </NavLink>
                    </Button>
                    <Button
                        sx={{ borderRadius: '12px', background: '#D9B3F8', paddingX: 4}}
                        variant="contained"
                    >
                        <NavLink to='/register' style={{ fontFamily: 'Raleway', textTransform: 'capitalize',
                            color: '#fff', textDecoration:'none'}}>
                            Register
                        </NavLink>
                    </Button>
                </Box>
            </Box>
        </>
    )
}