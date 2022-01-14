import React from 'react';

const Login = () => {

  return (
    <div>
      <h1>Please login to Spotify</h1>
      <form action="/auth/login">
        <input type="submit" value="Login with Spotify" />
      </form>
    </div>
  )
}

export default Login;