import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import 'style/nav.css'


function Navi() {
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
      window.removeEventListener("scroll",()=>{}) //컴포넌트를 사용하지 않을 때는 윈도우에서 이벤트를 지움
    }
  },[])

  const onChange = (e)=>{
    setSearchValue(e.target.value)
    if(e.target.value === ""){
      navigate('/')
    }else{
      navigate(`/search?q=${e.target.value}`);//?하고 쓰면 파람값//주소창에 입력한 값이 전달 //입력한 시점에서 searchpage가 표시됨(이동)
    }
  }
 

  //onClick={window.location.reload} 누를때마다 로드
  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <input type='search' placeholder='영화이름입력' className='nav__input' onChange={onChange} value={searchValue}/>
      <Link to={'myprofile'}>
      <img src='https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41'
       alt='user logo' className='nav__avatar'/>
       </Link>
    </nav>
  )
}

export default Navi