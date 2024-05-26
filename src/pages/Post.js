import React, {useContext, useEffect, useState} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from '../AuthContext';
import axios from "axios";

const Post = () => {
    const [post, setPost] = useState({});
    const {postId} = useParams();

    const {auth, logOut} = useContext(AuthContext);
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

    const getPost = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getposts');
            return response.data.find(item => item.post_id === parseInt(postId)) || {};
        } catch (error) {
            alert('Error:' + error);
            return {};
        }
    }

    useEffect(() => {
        const fetchPost = async () => {
            const postData = await getPost();
            setPost(postData);
        };

        fetchPost();
    }, [postId]); // Empty dependency array to only run once on component mount

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
            <div>
                <span>{post.post_title ?? 'Untitled'}</span>
                <br/>
                <span>{post.post_desc ?? 'Empty'}</span>
            </div>
        </>
    );
}

export default Post;