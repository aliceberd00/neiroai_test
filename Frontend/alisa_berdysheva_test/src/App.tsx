import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from "./Components/header/Header";
import PrivateRouterPage from "./Components/privateRouter/privateRouter";
import Footer from "./Components/footer/Footer";

function App() {
    const helmetContext = {};

    return (
        <>
            <HelmetProvider context={helmetContext}>
                <div className="App">
                    <Header />
                    <PrivateRouterPage />
                    <Footer/>
                </div>
            </HelmetProvider>
        </>
    );
}

export default App;
