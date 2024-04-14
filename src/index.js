import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Welcome />}></Route>
                    <Route path="register" element={<Register />}></Route>
                    <Route path="login" element={<Register />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
