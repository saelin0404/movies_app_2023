import axios from 'api/aixos';
import React, { useEffect, useState } from 'react'
import 'style/row.css'
import MovieModal from './MovieModal';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';  //npm i swiper //https://swiperjs.com/react#usage
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


function Row({isLargeRow,title,id,fetchUrl}) {
  const [movies,setMovies] = useState([]);
  const [modalOpne,setModalOpne] = useState(false);
  const [movieSelected,setMovieSelected] = useState({});

  useEffect(()=>{
    fetchMovieData();
  },[fetchUrl])//fetchUrl이 바뀔때마다

  const fetchMovieData = async ()=>{
    const request =  await axios.get(fetchUrl);
    console.log(request);
    setMovies(request.data.results);
  }

  // 이미지를 눌렀을 때
  const handleClick = (movie)=>{
    setModalOpne(true)
    setMovieSelected(movie)
  }

  return (
    <section className='row'>
      <h2>{title}</h2>
      <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation//버튼사용유무(화살표)
      pagination={{ clickable: true }}//페이지가 얼마나 있는지
      loop={true}//롤링기능
      breakpoints={{
        1378:{
          slidesPerView:6,//한번에 보이는 슬라이드 갯수
          slidesperGroup:6//몇개씩
        },
        988:{
          slidesPerView:5,//한번에 보이는 슬라이드 갯수
          slidesperGroup:5//몇개씩
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
      {/* <div className='slider'>
      <div className='slider__arrow left'>
        <span className='arrow' onClick={()=>{document.getElementById(id).scrollLeft-=(window.innerWidth - 80)}}>
          {"<"}
        </span>
      </div> */}

      <div id={id} className='row__posters' key={id}>
        {movies.map((movie)=>(
          <SwiperSlide>
            <img
              key={movie.id}
              onClick={()=>handleClick(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path:movie.backdrop_path}`}
              loading='lazy'
              alt={movie.title || movie.name || movie.original_name}
            />
          </SwiperSlide>
        ))}
      </div>

      {/* <div className='slider__arrow right'>
        <span className='arrow' onClick={()=>{document.getElementById(id).scrollLeft+=(window.innerWidth - 80)}}>
          {">"}
        </span>
      </div>
      </div> */}
      
      </Swiper>
      {modalOpne && (
        <MovieModal {...movieSelected} setModalOpne={setModalOpne}/>//파람스={스테잇값}
      )}
    </section>
  )
}

export default Row