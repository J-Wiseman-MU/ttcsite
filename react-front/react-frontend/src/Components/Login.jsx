import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../auth.js';
import { alphanum } from '../alphanum.js';

function Login({ setU }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    const handleLogin = async () => {
        var val = false;
        if(alphanum(username) && alphanum(password)){
            val = await authenticate(username, password);
        }
        if (val) {
            setU(username)
            nav('/lobby');
        } else {
            setUsername('');
            setPassword('');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleLogin}>
                    Submit
                </button>
            </form>
            <p>
                Don't have an account?{' '}
                <a href="/createaccount">Create an account</a>
            </p>
        </div>
    );
}

export default Login;
