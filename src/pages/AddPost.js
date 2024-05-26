import React from 'react';
import {useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const {auth, logOut}  = useContext(AuthContext);

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

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescChange = (event) => {
        setDesc(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const author = auth.username;

        try {
            const response = await axios.get('http://localhost:5000/addpost', {
                params: {
                    title,
                    author,
                    desc,
                },
            });
            if (response.data.message === 'Post added!') {
                alert('Post added!');
                navigate('/board');
            }
        } catch (error) {
            //alert('Error' + error);
            alert()
        }
    }

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
                {auth.username ? (
                    <form onSubmit={handleSubmit}>
                        <label>Title:<br/>
                            <input type="text" id="title" name="title" value={title} placeholder="Title"
                                   onChange={handleTitleChange}/>
                        </label><br/>
                        <label>Description:<br/>
                            <textarea id="desc" name="desc" value={desc} placeholder="Write your post here..."
                                      onChange={handleDescChange}/>
                        </label><br/>
                        <button type="submit">Post</button>
                    </form>
                ) : (
                    <h3>Not logged in.</h3>
                )}
            </div>
        </>
    )
};

export default AddPost;