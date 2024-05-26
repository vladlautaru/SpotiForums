import React, {useContext, useEffect} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import './Welcome.css';
import {AuthContext} from "../AuthContext";

const Welcome = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const name = JSON.stringify(auth).slice(20, -2);
        if (!(name === 'null')) {
            navigate('/board');
        }
    }, [auth, navigate]);

    return (
        <div className="div">
            <p className="p1"><b>Spoti<span className="highlight">Forums</span></b></p>
            <p className="p2"><b>All about music. All about you.</b></p>
            <div className="div2">
                <Link to="/register">
                    <button type="button" className="button1"><b>Register</b></button>
                </Link>
                <Link to="/login">
                    <button type="button" className="button2"><b>Log-In</b></button>
                </Link>
            </div>
            <Outlet />
        </div>
    )
};

export default Welcome;