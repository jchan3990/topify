import React, { useState } from 'react';

const LoginForm = ({ getCreds }) => {
  const [inputs, setInput] = useState({});

  const handleChange = e => {
    setInput({...inputs, [e.target.name]: e.target.value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    getCreds(inputs)
    setInput({});
  }

  return (
    <form className="login-form" onSubmit={handleSubmit} >
      <label htmlFor="username">Username: </label>
      <input className="form-input" type="text" name="username" required value={inputs.username || ''} onChange={handleChange} />
      <br/>
      <label htmlFor="password">Password: </label>
      <input className="form-input" type="password" name="password" required value={inputs.password || ''} onChange={handleChange} />
      <br/>
      <button>Submit</button>
    </form>
  )
}

export default LoginForm;