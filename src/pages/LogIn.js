import React from 'react';
import {useState, useContext} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import './LogIn.css'

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState(null);
    const {setAuth}  = useContext(AuthContext);

    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleClick = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await axios.get('http://localhost:5000/login', {
                params: {
                    username,
                    password,
                },
            });
            setData(response.data.message);
            if (response.data.message === 'Correct login') {
                setAuth({ username });
                navigate('/board');
            } else if (response.data.message === 'Incorrect login') {
                alert('Incorrect login. Try again')
            }
        } catch (error) {
            alert('Error:' + error);
        }
    };

    return (
        <div className="form-container">
            <div className="form_title_div">
                <span className="form_title"><b>Log<span className="form_title_2"> in!</span></b></span>
            </div>
            <form onSubmit={handleClick}>
                <label>Username:<br/>
                    <input type="text" id="username" name="username" value={username} placeholder="Username" onChange={handleUsernameChange}/>
                </label><br/>
                <label>Password:<br/>
                    <input type="password" id="username" name="username" value={password} placeholder="Password" onChange={handlePasswordChange}/>
                </label><br/>
                <button type="submit">Log-in</button>
            </form>
        </div>
    );
};

export default LogIn;