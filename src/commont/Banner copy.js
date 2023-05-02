import React, { useEffect, useState } from 'react'
import axios from 'api/aixos';
import requests from 'api/requests';
import 'style/banner.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const [movie,setMovie] = useState([]);
  const [isClicked,setIsClicked] = useState(false)
  const navigate = useNavigate();
  
  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async ()=>{
   const response = await axios.get(requests.fetchNowPlaying)
   console.log("request/영화정보(banner)",response);
   
   const movieId = response.data.results[
    Math.floor(Math.random() * response.data.results.length+0)].id;

    const {data:movieDetail} = await axios.get(`/movie/${movieId}`,{params:{append_to_response : 'videos'}});
    console.log({data:movieDetail});
    setMovie(movieDetail);
  }

  const truncate = (str,n) =>{
    return str?.length>n ? str.substr(0,n-1) + "..." : str;
    //str?은 str이 없으면 바로 error가 뜨지만 옵션널연산자를 붙여서 있든 없던 나오게
    //글자가 n보다 크면
    // str.substr(0,n-1) + "..."를 0부터 n-1까지 를 ...을붙여준다
  }
  //"https://image.themoviedb.org/t/p/original/ 이미지주소 공식 홈페이지에 나와있음
  // {movie.title || movie.name || movie.original_name} 값을 찾을수 없을때 뒤에있는 값을 실행한다 (널병합연산자)
  // movie.videos.results[0]?.key 물음표로 옵션널 연산자를 넣어줌 언디파인이라는 값을 넣어주게 됨


  if(!isClicked){
    return (
      <header className='banner' 
      style={{backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,backgroundPosition:"top center",backgroundSize:"cover"}}>
      <div className='banner__content'>
        <h1 className='banner__title'>
          {movie.title || movie.name || movie.original_name} 
        </h1>
        <div className='banner___buttons'>
          <button className='banner_button play' onClick={()=>setIsClicked(true)}>play</button>
          <button className='banner___buttons info' onClick={()=> navigate(`/${movie.id}`)}></button>
        </div>
        <p className='banner__description'>
          {truncate(movie.overview,100)}
        </p>
      </div>
      </header>
    )
    
  }else{
    return(
      <Container>
        <HomeContainer>
          <Iframe
            src={`https://www.youtube.com/embed/${movie.videos.results[0]?.key}
            ?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0]?.key}`}
            width="640"
            height="360"
            frameborder="0"
            allow='autoplay; fullscreen'
          ></Iframe>
        </HomeContainer>
      </Container>
    )
  }//if문
}

//만든 컨테이너를 div처럼 사용하겠다
const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  width:100%;
  height:100vh;`

const HomeContainer = styled.div`
  width:100%;
  height:100%;`

const Iframe = styled.iframe`
  width:100%;
  height:100%;
  z-index:-1;
  opacity:0.65;
  boder:none;
  &:after{
    content:"";
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
  }`

export default Banner