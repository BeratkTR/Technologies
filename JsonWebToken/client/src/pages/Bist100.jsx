import React from 'react'
import { useEffect } from 'react';
import { useState, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';



function Bist100() {
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState("");
    const {logout, loading} = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async() => {
          if(loading) return;

            try{
                const result = await axios.get('/api/companies/bist100');
                setCompanies(result.data);
            }
            catch(err){
                console.log(err);
                if(err.response.status == 401) {
                    setError("Lütfen giriş yapınız!");
                    logout();
                    return;
                }
                setError("Failed to load companies");
            }
        }
        fetchData();

    }, [loading]);


  return (
    <div>
      <h1>Bist100</h1>

      {error && <h2 style={{color: "red"}}>{error}</h2>}

        <ul>
           {companies.map((company, index) => (
            <li key={index}>
                <strong>{company.name}</strong>: {company.price}
            </li>
           ))} 
        </ul>
    </div>
  )
}

export default Bist100
