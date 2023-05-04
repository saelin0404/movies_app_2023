import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import 'style/nav.css'
import img from 'img/asset2.png'



function Navi({userObj}) {
  const [show,setShow] = useState(false);
  const [searchValue,setSearchValue] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    window.addEventListener("scroll",()=>{
      if(window.scrollY > 50){
        setShow(true)
      }else{
        setShow(false)
      }
    })
    return()=>{
      window.removeEventListener("scroll",()=>{})
    }
  },[])

  const onChange = (e)=>{
    setSearchValue(e.target.value)
    if(e.target.value === ""){
      navigate('/')
    }else{
      navigate(`/search?q=${e.target.value}`);
    }
  }
 
  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <h1 className='nav__logo' onClick={()=>{window.location.href = "https://saelin0404.github.io/movie_app_2023/"}}>MOVIE</h1>
      <input type='search' placeholder='영화이름입력' className='nav__input' onChange={onChange} value={searchValue}/>
      <Link to={'myprofile'}>
        <img src={userObj.photoURL ? userObj.photoURL:img} alt='user logo' className='nav__avatar'/>
      </Link>
    </nav>
  )
}

export default Navi