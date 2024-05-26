import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import Board from "./pages/Board";
import AddPost from "./pages/AddPost";
import Post from "./pages/Post";
import {AuthProvider} from "./AuthContext";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Welcome />}></Route>
                    <Route path="register" element={<Register />}></Route>
                    <Route path="login" element={<LogIn />}></Route>
                    <Route path="board" element={<Board />}></Route>
                    <Route path="add_post" element={<AddPost />}></Route>
                    <Route path="post/:postId" element={<Post />}></Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
