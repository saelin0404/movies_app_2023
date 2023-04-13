import axios from '../api/aixos';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Detailpage() {
  const [movie,setMovie] = useState({});//
  let {movieId} = useParams();//파람값을 가져올수 있음 //{}객체로 되어있기 때문에 구조분해할당으로 받음(속성값만 나옴) 
  console.log(useParams());//지정한이름의 파람스값이 나옴(속성은 영화의 아이디 값)

  useEffect(()=>{
    fetchData();
  },[movieId])

  const fetchData = async(fetch) =>{
    try{
      const requests = await axios.get(`/movie/${movieId}`); //아이디나 비밀번호같은 정보는 get(주소창으로 전달)이 아닌 post로 전달하여 body에 숨겨서 전달하게 됨
      setMovie(requests.data)

    }catch(error){
      console.log(error.message);
    }
  }
  if(!movie) return <div>...loading</div>
  return (
    <section>
      <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title || movie.original_name} width={300} height={300}/>
    </section>
  )
}

export default Detailpage