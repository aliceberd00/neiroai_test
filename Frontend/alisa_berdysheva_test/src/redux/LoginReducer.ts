import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILogin } from "../types/types";

// Убедитесь, что интерфейс ILogin определен правильно
// interface ILogin {
//     id: number;
//     email: string;
//     password: string;
//     is_active: boolean; // Изменено на boolean
//     is_superuser: boolean;
//     is_verified: boolean;
//     username: string;
//     isError?: boolean;
//     nextPage?: string;
//     isNeedsNavigate?: number;
// }

const initialState: ILogin = {
    id: 1,
    email: '',
    password: '',
    is_active: true,
    is_superuser: false,
    is_verified: false,
    username: '',
    isError: false,
    nextPage: '',
    isNeedsNavigate: 0,
};

export const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        redux_login(state, action: PayloadAction<ILogin>) {
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.username = action.payload.username;
            state.is_active = true;
            state.is_superuser = false;
            state.is_verified = false;
        },
        redux_logout(state) {
            state.email = "";
            state.password = "";
            state.username = "";
            state.is_active = false;
            state.is_superuser = false;
            state.isError = true;
        },
        setLoginError(state) {
            state.isError = true;
        },
        setNextPage(state, action: PayloadAction<string>) {
            state.nextPage = action.payload;
        },
        setNeedsNavigate(state, action: PayloadAction<number>) {
            state.isNeedsNavigate = action.payload;
        },
    },
});

export default LoginSlice.reducer;
