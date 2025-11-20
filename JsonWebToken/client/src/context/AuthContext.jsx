import React from 'react'
import { useState, createContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

axios.defaults.baseURL = "http://localhost:3000";

const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token){
            setIsAuthenticated(true);
            axios.defaults.headers.common["Authorization"] = token;

           try{
            const payload = JSON.parse(atob(token.split(".")[1]))
            if(payload.exp*1000 < Date.now()){ //if expired logout
                setLoading(false) 
                 return logout();  
            }

            setUser(payload);
            }
            catch(err){
                console.log("Error decoding token!");
                logout();
            }
        }

        setLoading(false);
    }, [])


    const login = (token) => {
        setIsAuthenticated(true);
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = token;

        try{
            const payload = JSON.parse(atob(token.split(".")[1]))
            setUser(payload);
        }
        catch(err){
            console.log("Error decoding token!");
            logout();
        }
    }

    const logout = () => {
        setIsAuthenticated(false)
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        setUser("");
    }

    const upgradePremium = async() => {
        try{
          const result = await axios.post("/api/auth/upgrade-premium");
          login(result.data.token);
        }catch(err){
          console.log(err);
          if(err.response.status == 401) logout();
        }
    }
    const downgradePremium = async() => {
        try{
          const result = await axios.post("/api/auth/downgrade-premium");
          login(result.data.token);
        }catch(err){
          console.log(err);
          if(err.response.status == 401) logout();
        }
    }


    return (
        <AuthContext.Provider value={{isAuthenticated, user, login, logout, loading, upgradePremium, downgradePremium}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}

