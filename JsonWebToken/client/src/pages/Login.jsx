import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';


function Login() {
    const [formData, setFormData] = useState({username: "", password: ""});
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(formData.username == "" || formData.password == ""){
            setError("Please fill all the fields.");
            return;
        }

        setError("");
        console.log(formData);

        axios.post("/api/auth/login", formData)
        .then(res => {
            console.log("Login success:", res.data);
            login(res.data.token)
            navigate("/");
        })
        .catch(err => {
            if(err.response.status == 404) return setError("User does not exists");
            if(err.response.status == 401) return setError("Wrong password");
            console.log("Login error: ", error)
            setError("Login failed.");
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setError("")

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

  return (
    <div style={styles.container}>
      <h2>Login:</h2>

      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name='username' value={formData.username} onChange={handleChange}  placeholder='Enter your username'/>
        </div>
        <div>
            <label htmlFor="username">Password:</label>
            <input type="password" id="password" name='password' value={formData.password} onChange={handleChange}  placeholder='Enter your password'/>
        </div>

        <button type='submit'>Login</button>

        <p>Does not have an account? Then <Link to="/signup">Sign up</Link></p>

        {error && <p className="error">{error}</p>} 
      </form>
    </div>
  )
}


const styles = {
    container: {
        padding: "50px 100px",
        backgroundColor: "lightgray",
        width: "300px",
        borderRadius: "10px",
        margin: "100px auto"
    }
}

export default Login
