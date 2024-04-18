import React from 'react';

const LogIn = () => {
    return (
        <div>
            <form>
                <label>Username:
                    <input type="text" id="username" name="username"/>
                </label><br/>
                <label>Password:
                    <input type="password" id="username" name="username"/>
                </label><br/>
                <button type="submit">Log-in</button>
            </form>
        </div>
    );
};

export default LogIn;