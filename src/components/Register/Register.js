import React, { useState } from 'react'

function Register({onRouteChange, loadUser}) {
  const initialValue = {
    name: "",
    email: "",
    password: "",
  }

  const [registerState, setRegisterState] = useState(initialValue);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setRegisterState({
      ...registerState,
      [name]: value,
    });
  };

  const onSubmitRegister = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/register", {
      method: "post", 
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: registerState.name,
        email: registerState.email,
        password: registerState.password,
      })
    }).then(res => res.json())
    .then(user => {
      if(user){
        loadUser(user);
        onRouteChange("home");
      } 
    });
  };

  return (
    <article className="br3 ba dark-gray b--black-10 mv6 w-100 w-50-m w-25-l mw6 shadow-5 center pa4">
      <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" onChange={handleInputChange}/>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email"  id="email" onChange={handleInputChange}/>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={handleInputChange}/>
            </div>
          </fieldset>
          <div className="">
            <input 
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
              type="submit" 
              value="Register" 
              onClick={onSubmitRegister}
            />
          </div>
          <div className="lh-copy mt3 flex" style={{columnGap: '10px'}}>
            <p>Already have account?</p>
            <p onClick={() => onRouteChange("signin")} className="link dim black db pointer">Sign In</p>
          </div>
        </form>
      </main>
    </article>
  )
}

export default Register