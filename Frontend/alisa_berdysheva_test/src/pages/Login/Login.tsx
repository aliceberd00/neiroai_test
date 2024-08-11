import React, { useState, useEffect } from 'react';
import {Box, Button, CssBaseline, TextField, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";
import { NavLink, useNavigate } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import { loginUserAsync } from "../../asyncActions/login";
import {LoginSlice} from "../../redux/LoginReducer";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isError, setError] = useState(0);
    const nextPage = useAppSelector(state => state.user.nextPage);
    const isNeedsNavigate = useAppSelector(state => state.user.isNeedsNavigate);

    const handlePassword = (e: React.ChangeEvent<any>) => {
        if (e.target.value !== undefined){
            setPassword(e.target.value)
        }
    }

    const f_login = async () => {
        dispatch(loginUserAsync(email, password));
        setTimeout(() => {
            navigate("/chats");
        }, 1000);
    };


    useEffect(() => {
        if(isNeedsNavigate === 1){
            if(nextPage === "/chats"){
                setError(0)
                setTimeout(() => {
                    navigate(nextPage);
                    dispatch(LoginSlice.actions.setNeedsNavigate(0));
                }, 1000);
            } else{
                setError(1)
                dispatch(LoginSlice.actions.setNeedsNavigate(0));
            }
        }
    },[isNeedsNavigate]);

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
                    // padding: 2
                }}
            >
                <Stack spacing={2} alignItems='center'>
                    <Typography style={{fontWeight: 500, textAlign: 'center', fontFamily:'Raleway', marginTop:'2em'}}
                                variant='h2'> Login to your account </Typography>

                    <TextField
                        style={{fontFamily:'Raleway'}}
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        label="Email"
                        required
                        helperText = {isError === 1 && "incorrect email"}
                        error = {isError === 1}
                    />

                    <TextField
                        style={{fontFamily:'Outfit'}}
                        type="password"
                        helperText = {isError === 1 && "incorrect password"}
                        error = {isError === 1}
                        value={password}
                        onChange={handlePassword}
                        id="password"
                        label="Password"
                        required
                    />

                    <Button
                        sx={{ borderRadius: '12px', background: '#D9B3F8', paddingX: 4}}
                        style={{ fontFamily: 'Raleway', textTransform: 'capitalize',
                            color: '#fff', textDecoration:'none'}}
                        variant="contained"
                        onClick={() => f_login()}
                    >
                        Login
                    </Button>

                    <div style={{ marginTop: "10px", textAlign: 'center' }}>
                        <p style={{fontFamily:'Raleway'}}>Don’t have an account?</p>
                        <NavLink style={{ textDecoration: 'none', fontFamily:'Raleway'}} to="/register">Create account here</NavLink>
                    </div>

                </Stack>
            </Box>
        </>
    )
}