import React, { useState } from 'react'

function SignIn({ onRouteChange, loadUser }) {
  const initialState = {
    signInEmail: "",
    signInPassword: "",
  }

  const [state, setState] = useState(initialState);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const onSubmitSignIn = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/signin", {
      method: "post", 
      headers: {'Content-Type': "application/json"},
      body: JSON.stringify({
        email: state.signInEmail,
        password: state.signInPassword,
      }),
    })
    .then(res => res.json())
    .then(data => {
      if(data === "Error Logged In"){
        onRouteChange('signin');
      } else {
        loadUser(data);
        onRouteChange('home');
      }
    })
  }

  return (
    <article className="br3 ba dark-gray b--black-10 mv6 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="email" 
                name="signInEmail"  
                id="email" 
                onChange={handleInputChange}
                value={state.signInEmail}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password" 
                name="signInPassword"  
                id="password" 
                onChange={handleInputChange}
                value={state.signInPassword}
              />
            </div>
          </fieldset>
          <div className="">
            <input 
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
              type="submit" 
              value="Sign in" 
              onClick={onSubmitSignIn}
            />
          </div>
          <div className="lh-copy mt3">
            <p onClick={() => onRouteChange("register")} className="f6 link dim black db pointer">Register</p>
          </div>
        </form>
      </main>
    </article>
  )
}

export default SignIn