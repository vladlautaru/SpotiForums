import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';  // Ensure you import the CSS file

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retype, setRetype] = useState('');
    const [data, setData] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRetypeChange = (event) => {
        setRetype(event.target.value);
    };

    const handleClick = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await axios.get('http://localhost:5000/register', {
                params: {
                    username,
                    email,
                    password,
                    retype,
                },
            });
            setData(response.data.message);
            if (response.data.message === 'User registered successfully') {
                alert(`username: ${username} email: ${email} password: ${password}`);
            }
        } catch (error) {
            alert('Error:' + error);
        }
    };

    return (
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleClick}>
                <label>Username:
                    <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} required />
                </label><br />
                <label>Email:
                    <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} required />
                </label><br />
                <label>Password:
                    <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required />
                </label><br />
                <label>Retype password:
                    <input type="password" id="retype" name="retype" value={retype} onChange={handleRetypeChange} required />
                </label><br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;