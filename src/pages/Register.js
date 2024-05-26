import React from 'react';
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retype, setRetype] = useState('');
    const [data, setData] = useState('');

    const navigate = useNavigate();

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
            switch (response.data.message) {
                case 'User registered successfully':
                    alert(`Account registered successfully`);
                    navigate('/login');
                    break;
                case 'Passwords do not match':
                    alert(`Passwords do not match. Try again`);
                    break;
                case 'Username already exists':
                    alert('Username already exists. Try again');
                    break;
            }
        } catch (error) {
            alert('Error:' + error);
        }
    };

    return (
        <div className="form-container">
            <div className="form_title_div">
                <span className="form_title"><b>Register<span className="form_title_2"> now!</span></b></span>
            </div>
            <form onSubmit={handleClick}>
                <label>Username:<br/>
                    <input type="text" id="username" name="username" placeholder="Username" value={username}
                           onChange={handleUsernameChange}/>
                </label><br/>
                <label>Email:<br/>
                    <input type="email" id="email" name="email" value={email} placeholder="Email"
                           onChange={handleEmailChange}/>
                </label><br/>
                <label>Password:<br/>
                    <input type="password" id="password" name="password" value={password} placeholder="Password"
                           onChange={handlePasswordChange}/>
                </label><br/>
                <label>Retype password:<br/>
                    <input type="password" id="retype" name="retype" value={retype} placeholder="Retype password"
                           onChange={handleRetypeChange}/>
                </label><br/>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;