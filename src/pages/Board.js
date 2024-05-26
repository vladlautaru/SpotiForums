import React, {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../AuthContext'; // Adjust the path as needed
import { useNavigate } from "react-router-dom";
import "./Board.css";
import axios from "axios";

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

    const handleAddPostButton = () => {
        navigate('/add_post');
    }

    const getPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getposts');
            return response.data;
        } catch (error) {
            alert('Error:' + error);
            return [];
        }
    }

    const spawnPosts = (posts, navigate) => {
        const container = document.getElementById("container");

        container.innerHTML = '';

        posts.forEach(post => {
            const postDiv = document.createElement('div');

            postDiv.className = 'post';

            postDiv.addEventListener('click', () => {
                navigate(`/post/${post.post_id}`);
            });

            postDiv.innerHTML = `
            <span class="post_date">${post.post_date_posted ?? 'Unknown Date'}</span>
            <br>
            <span class="post_title">${post.post_title ?? 'Untitled'}</span>
            <span class="post_author"> by ${post.post_author ?? 'Anonymous'}</span>
        `;
            container.appendChild(postDiv);
        });
    }

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const postsData = await getPosts();
            setPosts(postsData);
            spawnPosts(postsData, navigate);
        };

        fetchPosts();
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
                <button className="add_post_button" onClick={handleAddPostButton}>Add post</button>
            </div>
            <div id="container">

            </div>
        </>
    );
};

export default Board;