import React from 'react';

const Home = () => {
  return (
    <div className='app'>
      <h1>Please login to Spotify</h1>
      <form action="/auth/login">
        <input type="submit" value="Login with Spotify" />
      </form>
    </div>
  )
}

export default Home;