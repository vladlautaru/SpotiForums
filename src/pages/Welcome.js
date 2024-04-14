import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
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