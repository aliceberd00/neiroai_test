import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from 'react-redux';
import { setupStore } from "./redux/store";
// @ts-ignore
import * as Sentry from "@sentry/react";

Sentry.init({
    dsn: "https://516a3ac3f0764f2288570a44b22601b6@sentry.digitalberd.com/10",
    tracesSampleRate: 1.0,
});

const outerTheme = createTheme({
    palette: {
        primary: {
            main: "#9C28F7",
        },
        secondary: {
            main: "#B99AD2",
        },
    },
});

const store = setupStore();

// ReactDOM.render(
//     <BrowserRouter>
//         <Provider store={store}>
//         <ThemeProvider theme={outerTheme}>
//         <App />
//         </ThemeProvider>
//         </Provider>
//     </BrowserRouter>
//     document.getElementById('root')
// );

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider theme={outerTheme}>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
);