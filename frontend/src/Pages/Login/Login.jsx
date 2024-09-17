import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate(); // For redirecting after successful login

  // Handle input changes
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:4000/api/v1/login", {  // Login route
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      const json = await response.json();
      console.log(json);

      if (json.success) { 
        // Handle successful login
        alert('Login successful');
        localStorage.setItem("userEmail",credentials.email)
        localStorage.setItem('token', json.token); // Store token in localStorage
        navigate('/'); // Redirect to dashboard or another page
      } else {
        // Handle login failure
        alert('Invalid credentials, please try again');
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <div className='container'>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">Login</button>
        </form>

        <Link to="/createuser" className="m-3 btn btn-danger">I'm a New User</Link>
      </div>
    </div>
  );
};

export default Login;
