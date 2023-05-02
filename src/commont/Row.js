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
import { collection, addDoc , onSnapshot ,query, orderBy ,where} from "firebase/firestore";
import { doc, deleteDoc ,updateDoc} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db , storage } from 'fbase';


function Row({isLargeRow,title,id,fetchUrl,userObj}) {
  console.log(userObj);
  const [movies,setMovies] = useState([]);
  const [video,setVideo] = useState([]);
  const [modalOpne,setModalOpne] = useState(false);
  const [movieSelected,setMovieSelected] = useState({});
  const [likeMovie,setLikeMovie]= useState("")
  const [like,setLike]=useState([]);

  useEffect(()=>{
    // getTeets();
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
  },[fetchUrl])//fetchUrl이 바뀔때마다

  const fetchMovieData = async ()=>{
    const request =  await axios.get(fetchUrl);
    setMovies(request.data.results);
  }

  // 이미지를 눌렀을 때
  const handleClick = async(movie)=>{
    setModalOpne(true)
    setMovieSelected(movie)
    const {data:movieDetail} = await axios.get(`/movie/${movie.id}`,{params:{append_to_response : 'videos'}});
    setVideo(movieDetail)
  }

  const handleMouseOver = async (movie) => {
    const {data:movieDetail} = await axios.get(`/movie/${movie.id}`,{params:{append_to_response : 'videos'}});
    setVideo(movieDetail)
  };

  const handleMouseLeave = async () => {
    setVideo("")
  };

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
          <>
            <SwiperSlide>
            {movie.id === video.id ? (
                <iframe src={`https://www.youtube.com/embed/${video.videos.results[0]?.key}
                ?controls=0&autoplay=1&loop=1&mute=1&playlist=${video.videos.results[0]?.key}`} title='Youtube video player'
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                onMouseLeave={handleMouseLeave}
                ></iframe>
            ):(
              <img
              key={movie.id}
              onMouseOver={()=>handleMouseOver(movie)}
              className={`row__poster ${isLargeRow && "row__posterLarge"}`}
              src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path:movie.backdrop_path}`}
              loading='lazy'
              alt={movie.title || movie.name || movie.original_name}
            />
            )}
            {!isLargeRow && <p>{movie.title || movie.name || movie.original_name}</p>}
            <span onClick={()=>handleClick(movie)}>플러스버튼</span>
          </SwiperSlide>
          
          </>
          
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
        <MovieModal {...movieSelected} userObj={userObj} like={like} setModalOpne={setModalOpne} video={video}/>//파람스={스테잇값}
      )}
    </section>
  )
}

export default Row