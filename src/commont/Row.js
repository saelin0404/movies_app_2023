import axios from 'api/aixos';
import React, { useEffect, useState } from 'react'
import 'style/row.css'
import MovieModal from './MovieModal';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { collection, onSnapshot ,query, orderBy ,where} from "firebase/firestore";
import { db } from 'fbase';


function Row({isLargeRow,title,id,fetchUrl,userObj}) {
  const [movies,setMovies] = useState([]);
  const [video,setVideo] = useState([]);
  const [modalOpne,setModalOpne] = useState(false);
  const [movieSelected,setMovieSelected] = useState({});
  const [like,setLike]=useState([]);

  useEffect(()=>{
    const q = query(collection(db, "likes"),where("creatorID","==",userObj.uid),
     orderBy('createdAt','desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
          newArray.push({...doc.data(),id:doc.id})
      });
      setLike(newArray);
    });
  },[])

  useEffect(()=>{
    fetchMovieData();
  },[fetchUrl])

  const fetchMovieData = async ()=>{
    const request =  await axios.get(fetchUrl);
    setMovies(request.data.results);
  }


  const handleClick = async(movie)=>{
    setModalOpne(true)
    setMovieSelected(movie)
    const {data:movieDetail} = await axios.get(`/movie/${movie.id}`,{params:{append_to_response : 'videos'}});
    setVideo(movieDetail)
  }

  const handleMouseOver = async (movie) => {
    const {data:movieDetail} = await axios.get(`/movie/${movie.id}`,{params:{append_to_response : 'videos'}});
    if(movieDetail.videos){
      setVideo(movieDetail)
    }
  };

  const handleMouseLeave = async () => {
    setVideo("")
  };

  return (
    <section className='row'>
      <h2>{title}</h2>
      <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      breakpoints={{
        1378:{
          slidesPerView:6,
          slidesperGroup:6
        },
        988:{
          slidesPerView:5,
          slidesperGroup:5
        },
        625:{
          slidesPerView:4,
          slidesperGroup:4
        },
        0:{
          slidesPerView:3,
          slidesperGroup:3
        },
      }}
    >

      <div id={id} className='row__posters' key={id}>
        {movies.map((movie,index)=>(
          <>
            <SwiperSlide key={movie.id} onMouseLeave={handleMouseLeave}>
            {movie.id === video.id ? (
              !isLargeRow ?(
                <>
                  <iframe src={`https://www.youtube.com/embed/${video.videos.results[0]?.key}
                  ?controls=0&autoplay=1&loop=1&mute=1&playlist=${video.videos.results[0]?.key}`} title='Youtube video player'
                  className='row__poster'
                  ></iframe>
                  <div className='row__more' onClick={()=>handleClick(movie)}></div>
                </>
              ):(
                <img
                onClick={()=>handleClick(movie)}
                onMouseOver={()=>handleMouseOver(movie)}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path:movie.backdrop_path}`}
                loading='lazy'
                alt={movie.title || movie.name || movie.original_name}
              />
              )

            ):(
              <img
              onClick={()=>handleClick(movie)}
              onMouseOver={()=>handleMouseOver(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path:movie.backdrop_path}`}
              loading='lazy'
              alt={movie.title || movie.name || movie.original_name}
            />
            )}
          </SwiperSlide>
          </>
          
        ))}
      </div>
      </Swiper>
      {modalOpne && (
        <MovieModal {...movieSelected} userObj={userObj} like={like} setModalOpne={setModalOpne} video={video}/>//파람스={스테잇값}
      )}
    </section>
  )
}

export default Row