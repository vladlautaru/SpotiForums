import React, {useContext, useEffect} from 'react';
import { AuthContext } from '../AuthContext'; // Adjust the path as needed
import { useNavigate } from "react-router-dom";
import "./Board.css";

const Board = () => {
    const { auth, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut();
        navigate('/');
    };

    const handleLoginButton = () => {
        navigate('/login');
    }

    const handleRegisterButton = () => {
        navigate('/register');
    }

    const spawnPosts = (posts) => {
        const container = document.getElementById("container");

        container.innerHTML = '';

        posts.forEach(post => {
            const postDiv = document.createElement('div');

            postDiv.className = 'post';

            postDiv.addEventListener('click', () => {
                window.location.href = 'https://www.google.com';
            });

            postDiv.innerHTML = `
            <span class="post_date">${post.date}</span>
            <br>
            <span class="post_title">${post.title}</span>
            <span class="post_author"> by ${post.author}</span>
        `;
            container.appendChild(postDiv);
        });
    }

    useEffect(() => {
        // Call spawnPosts function here
        const posts = [
            { title: 'Post 1', author: "post_author", date:"25 05 2024"},
            { title: 'Post 2', author: "post_author_2", date:"25 05 2024"},
            // Add more posts as needed
        ];
        spawnPosts(posts);
    }, []); // Empty dependency array to only run once on component mount

    return (
        <>
            <div className="top_bar_div">
                <div>
                    <span className="logo"><b>S<span className="logo2">F</span></b></span>
                </div>
                {auth.username ? (
                    <div className="auth">
                        <span className="credentials">Logged in as: {auth.username}</span>
                        <button onClick={handleLogOut} className="log_out_button">Log Out</button>
                    </div>
                ) : (
                    <div className="auth_2">
                        <span className="credentials">You are not logged in.</span>
                        <div className="auth">
                            <button onClick={handleLoginButton} className="log_in_button">Log In</button>
                            <span className="credentials">or</span>
                            <button onClick={handleRegisterButton} className="register_button">Register</button>
                        </div>
                    </div>
                )}
            </div>
            <div className="add_div">
                <button className="add_post_button">Add post</button>
            </div>
            <div id="container"></div>
        </>
    );
};

export default Board;