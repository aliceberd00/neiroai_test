import React, { useState, useEffect } from 'react';
import { CssBaseline, Box, Typography, TextField, Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import { NavLink } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import { registerUser } from '../../asyncActions/register';
import {LoginSlice} from "../../redux/LoginReducer";
export default function RegisterPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const nextPage = useAppSelector(state => state.user.nextPage);
    const isNeedsNavigate = useAppSelector(state => state.user.isNeedsNavigate);

    const handleEmail = (e: React.ChangeEvent<any>) => {
        setEmailDirty(true);
        setEmail(e.target.value);
    };

    const handleLogin = (e: React.ChangeEvent<any>) => {
        setLogin(e.target.value);
    };

    const handlePassword = (e: React.ChangeEvent<any>) => {
        setPasswordDirty(true);
        setPassword(e.target.value);
    };

    const handleRegisterOnClick = async () => {
        dispatch(registerUser(email, login, password))
        setTimeout(() => {
            navigate("/chats");
        }, 1000);
    }
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        if(isNeedsNavigate === 1){
            if(nextPage === "/chats"){
                setTimeout(() => {
                    navigate(nextPage);
                    dispatch(LoginSlice.actions.setNeedsNavigate(0));
                }, 1000);
            } else{
                dispatch(LoginSlice.actions.setNeedsNavigate(0));
            }
        }
    },[isNeedsNavigate]);


    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
                <Stack spacing={2} alignItems='center'>
                    <Typography style={{fontWeight: 500, textAlign: 'center', fontFamily:'Raleway', marginTop:'2em'}}
                                variant='h2'> Sign Up here </Typography>

                    <TextField
                        style={{fontFamily:'Raleway' }}
                        label="Name"
                        error={login.length > 50}
                        helperText={login.length > 50 && 'Name is too long. It can only have 50 characters'}
                        value={login}
                        required
                        onChange={handleLogin}
                    />

                    <TextField
                        style={{fontFamily:'Raleway' }}
                        value={email}
                        label="Email"
                        error={email.length > 50}
                        helperText={email.length > 50 && 'Email is too long. It can only have 50 characters'}
                        onChange={handleEmail}
                        required
                    />

                    <TextField
                        style={{fontFamily:'Raleway' }}
                        error={passwordDirty && password.length > 50 }
                        helperText={passwordDirty && password.length > 50 && 'Password is too long. ' +
                            'It can only have 50 characters'}
                        label="Password"
                        value={password}
                        required
                        onChange={handlePassword}
                        type="password"
                    />

                    <div style={{ display: 'flex', alignItems: 'center'}}>
                    <Checkbox onChange={handleCheckboxChange} {...label} />
                    <Typography style={{fontFamily:'Raleway' }} variant="body2">
                        By clicking on the “Sign up” button, you agree to
                        <NavLink style={{fontFamily:'Raleway' }} to={'/privacy_policy'}>
                            {' '}
                            the privacy policy
                    </NavLink>
                    </Typography>
                     </div>

                    <Button
                        onClick={handleRegisterOnClick}
                        sx={{ borderRadius: '12px', background: '#D9B3F8', paddingX: 4}}
                        style={{
                            fontFamily: 'Raleway',
                            textTransform: 'capitalize',
                            color: '#fff',
                            textDecoration:'none',
                            background: isChecked || (login.length > 20 &&
                            login.length === 0 &&
                            emailDirty && email.length === 0 &&
                            passwordDirty && password.length > 20 &&
                            passwordDirty && password.length === 0) ?
                            '#9C28F7' : '#BBBBBB'
                        }}
                        variant="contained"
                        endIcon={<SendIcon />}
                        disabled={
                            login.length > 20 ||
                            login.length === 0 ||
                            (emailDirty && email.length === 0) ||
                            (passwordDirty && password.length > 20) ||
                            (passwordDirty && password.length === 0) ||
                            !isChecked
                        }
                    >
                      Sign up
                    </Button>

                    <div>
                        <Typography variant="body2" style={{fontFamily:'Raleway' }}>
                            Already have an account? <NavLink style={{fontFamily:'Raleway' }}
                                                              to="/login">Log in here</NavLink>
                        </Typography>
                    </div>
                </Stack>
            </Box>
        </>
    )
}