import React, { useEffect, useState } from 'react'
import axios from 'api/aixos';
import requests from 'api/requests';
import 'style/banner.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

function Banner() {
  const [movie,setMovie] = useState([]);
  const [isClicked,setIsClicked] = useState(false)
  const navigate = useNavigate();
  
  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async ()=>{
   const response = await axios.get(requests.fetchNowPlaying)
   
   const movieId = response.data.results[
    Math.floor(Math.random() * response.data.results.length+0)].id;

    const {data:movieDetail} = await axios.get(`/movie/${movieId}`,{params:{append_to_response : 'videos'}});
    setMovie(movieDetail);
  }

  const truncate = (str,n) =>{
    return str?.length>n ? str.substr(0,n-1) + "..." : str;
  }

  if(!isClicked){
    return (
      <header className='banner' 
        style={{backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition:"top center",backgroundSize:"cover"}}>
        <div className='banner__content'>
          <h1 className='banner__title'>
            {movie.title || movie.name || movie.original_name} 
          </h1>
          <div className='banner__buttons'>
            <button className='banner__button play' onClick={()=>setIsClicked(true)}>play</button>
            <button className='banner__button info' onClick={()=> navigate(`/${movie.id}`)}>Detail</button>
          </div>
          <p className='banner__description'>
            {truncate(movie.overview,100)}
          </p>
        </div>
        <div className='banner__fadeBottom'></div>
      </header>
    )
    
  }else{
    return(
      <Container>
        <HomeContainer>
          <Back onClick={()=>setIsClicked(false)}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </Back>
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
  }
}

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
  const Back = styled.span`
  position:absolute;
  left:50px;
  top:80px;
  z-index:10;
  color:#fff;
  opacity: 0.5;
  transition: all 0.3s linear;
  &:hover{
    opacity: 1;
  }
  &>*{
    font-size:40px;
  }
  `
export default Banner