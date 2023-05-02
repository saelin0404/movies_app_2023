import axios from '../api/aixos';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Likes({first}) {
  const [movie,setMovie] = useState({});//
  let {movieId} = useParams();//파람값을 가져올수 있음 //{}객체로 되어있기 때문에 구조분해할당으로 받음(속성값만 나옴) 


  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async(fetch) =>{
    try{
      if(first){
        const requests = await axios.get(`/movie/${first}`)
        console.log("영화정보들 디테일",requests);
        setMovie(requests.data)
      }
    }catch(error){
      console.log(error.message);
    }
  }

  if(!movie) return <div>...loading</div>
  return (
    <section style={{color:"#fff"}}>
      <h3>{movie.title || movie.original_name}</h3>
      <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title || movie.original_name} width={300} height={300}/>
      <p className='modal__datail'>
        <span className='modal__user_perc'>100% for you</span>{"   "}
        {movie.release_date ? movie.release_date : movie.first_air_date}
      </p>
      <p className='modal__details'>평점 : {movie.vote_average}</p>
      <p className='modal__overview'>{movie.overview}</p>
      {movie.videos &&
        <ul>
          {movie.videos.results.map((vi)=>(
            <li>
              <iframe src={`https://www.youtube.com/embed/${vi?.key}
                ?controls=0&autoplay=1&loop=1&mute=1&playlist=${vi?.key}`} title='Youtube video player'
                width="120"
                height="120"></iframe>
            </li>
          ))}
        </ul>
      }
      {movie.genres &&
        <ul>
          {movie.genres.map((genre)=>(
            <li>{genre.name}</li>
          ))}
        </ul>
      }
    </section>
  )
}

export default Likes