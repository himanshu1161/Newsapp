
import React, { useState } from 'react'
import axios from 'axios'

const Signup = () => {

    const [usernameReg, setUsernameReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')

 

  const register =  () =>{
    axios.post("http://localhost:3001/register",{
    username: usernameReg,
    passwords: passwordReg,}).then((response)=>{
      console.log(response);
    });
  };
  return (
    <form>
  <div style={{marginTop: '200px'}}>
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"   onChange={(e)=>{setUsernameReg(e.target.value)}}/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1"  onChange={(e)=>{setPasswordReg(e.target.value)}}/>
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary"  onClick={register}>Submit</button>
</form>
  )
}

export default Signup
