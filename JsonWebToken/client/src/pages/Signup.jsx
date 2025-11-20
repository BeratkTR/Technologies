import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


function Signup() {
    const [formData, setFormData] = useState({username: "", password: ""});
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(formData.username == "" || formData.password == ""){
            setError("Please fill all the fields.");
            return;
        }

        setError("");
        console.log(formData);

        axios.post("/api/auth/signup", formData)
        .then(res => {
            navigate("/");
        })
        .catch(err => {
            console.log(err.response)
            if(err.response.status == 409) return setError("User already exits.");
            setError("signup failed.");
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
      <h2>Sign Up:</h2>

      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name='username' value={formData.username} onChange={handleChange}  placeholder='Enter your username'/>
        </div>
        <div>
            <label htmlFor="username">Password:</label>
            <input type="password" id="password" name='password' value={formData.password} onChange={handleChange}  placeholder='Enter your password'/>
        </div>

        <button type='submit'>signup</button>

        <p>Already have an account? Then <Link to="/login">login</Link></p>

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

export default Signup
