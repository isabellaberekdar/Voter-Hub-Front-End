import React from "react";
import './AuthForm.css';

const AuthFormView = props => {
  const { name, displayName, handleSubmit, error, handleChange, isLoggedIn, userEmail, thisPage } = props;

  // let myBranch = 
 
  return (
    <div className="container">
      <div className="login-box">
        {thisPage === "/signup" ? <h1 id="form-title">Sign Up</h1> : <h1 id="form-title">Log In</h1>}
        <form onSubmit={handleSubmit} name={name}>
          <div className="fields">
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" onChange={handleChange} placeholder="Email" />
          </div>
          <div className="fields">  
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" onChange={handleChange} placeholder="Password" />
          </div>
          <div>
            <center>
              <button type="submit" id="form-submit-button">{displayName}</button>
            </center>
          </div>
          <div className="error">
            {error && error.response && <div> {error.response.data} </div>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthFormView;