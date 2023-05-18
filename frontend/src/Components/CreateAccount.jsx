import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from '../create.js';
import { alphanum } from '../alphanum.js';

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    var success = false;
    if(alphanum(username) && alphanum(password))
    {
        success = await create(username, password);
    }
    if (success) {
      navigate('/');
    } else {
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-auto">
          <h1>Create Account</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;