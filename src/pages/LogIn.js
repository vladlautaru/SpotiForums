import React, { useState } from 'react';
import axios from 'axios';
import './LogIn.css';

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState(null);

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
                alert(`username: ${username} password: ${password}`);
            }
        } catch (error) {
            alert('Error:' + error);
        }
    };

    return (
        <div className="form-container">
            <h1>Log In</h1>
            <form onSubmit={handleClick}>
                <label>Username:
                    <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} required />
                </label><br />
                <label>Password:
                    <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required />
                </label><br />
                <button type="submit">Log-in</button>
            </form>
        </div>
    );
};

export default LogIn;