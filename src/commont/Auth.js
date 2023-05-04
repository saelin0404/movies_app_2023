import React, { useState } from 'react'
import {authService} from 'fbase';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword ,GithubAuthProvider,GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import '../style/auth.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';

function Auth() {
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[newAccount,setNewAccount] = useState(true)
  const[error,setError] = useState('');

  const onChange = (e) =>{
    const {target:{name,value}} = e;
    if(name === 'email'){
      setEmail(value); 
      
    }else if(name === 'password'){
      setPassword(value);
    }
  }

  const onSubmit =async(e)=>{
    e.preventDefault();
    let data;
    try{
      if(newAccount){
        data =await createUserWithEmailAndPassword(authService, email, password)
      }else{
        data =await signInWithEmailAndPassword(authService, email, password)
      }
    }catch(error){
      console.log(error);
      setError(error.message)
    }
  }
  const toggleAccount = () =>{setNewAccount(prev => !prev)}
    //sns로 회원가입
    const onsocialClick = async (e) =>{
      console.log('e.target.name->',e.target.name);
      const {target:{name}} = e;
      let provider;
      if(name === 'google'){
        provider = new GoogleAuthProvider();
  
      }else if(name === 'github'){
        provider = new GithubAuthProvider();
      }
      const data = signInWithPopup(authService, provider)
    }

  return (
    <div className='auth'>
      <h1>MOVIE</h1>
      <form onSubmit={onSubmit} className='container'>
        <input name='email' type='email' placeholder='Eamil' required value={email} onChange={onChange} className='authInput'/>
        <input name='password' type='password' placeholder='Password' required value={password} onChange={onChange} className='authInput'/>
        <input type='submit' value={newAccount ? 'Create Account':'Log In'} className='authInput authSubmit'/>

        {error && <span className='authError'>{error}</span>}
      </form>
      <span onClick={toggleAccount} className='authSwitch'>
        {newAccount ? "- Sign In -" : '- Create Account -'}
      </span>
      <div className='logSns'>
        <button name='google' onClick={onsocialClick}><FontAwesomeIcon icon={faGoogle}/></button>
        <button name='github' onClick={onsocialClick}><FontAwesomeIcon icon={faGithub}/></button>
      </div>
    </div>
  )
}

export default Auth