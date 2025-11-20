import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function Home() {
  const {user, upgradePremium, downgradePremium} = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to the Home Page.</h1>
      <p>This is the home page of the application.</p>
      {
        user && (
            user.premium ? 
                <button onClick={downgradePremium}>Premium iptal</button>
                :
                <button onClick={upgradePremium}>Premium al</button>
        )
      }
    </div>
  )
}

export default Home
