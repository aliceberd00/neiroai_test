import React from "react";
import { Routes, Route, Navigate} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline"; // Импортируем CssBaseline из Material-UI
import LoginPage from "../../pages/Login/Login";
import ChatsPage from "../../pages/Chats/Chats";
import MainPage from "../../pages/Main/Main";
import RegisterPage from "../../pages/Register/Register";
import ErrorPage from "../../pages/Error/Error";
import PrivacyPolicyPage from "../../pages/PrivacyPolicy/PrivacyPolicy";
import MyDialogPage from "../../pages/MyDialog/MyDialog";
import {useAppSelector} from "../../hooks/redux";

export default function PrivateRouterPage() {
    const userEmail = useAppSelector((state) => state.user.email);
    return (
        <>
            <CssBaseline />
            <div>
                <Routes>
                    <Route path="/" element={userEmail === "" ? <MainPage /> : <Navigate to="/chats" />} />
                    <Route path="*" element={ <ErrorPage />}/>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/privacy_policy" element={<PrivacyPolicyPage />} />
                    <Route path="/chats" element={<ChatsPage />} />
                    <Route path="/dialog/:botId" element={<MyDialogPage />} />
                </Routes>
            </div>
        </>
    );
}
