import axios from '../api/aixos';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../style/detail.css';
import { collection, onSnapshot ,query, orderBy ,where} from "firebase/firestore";
import { doc, deleteDoc , addDoc} from "firebase/firestore";
import { db } from 'fbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlay } from '@fortawesome/free-solid-svg-icons';

function Detailpage({userObj}) {
  const [movie,setMovie] = useState({});
  let {movieId} = useParams();
  const [like,setLike]=useState([]);
  const [likeMovie,setLikeMovie]= useState(false)

  useEffect(()=>{
    fetchData();
  },[movieId])

  useEffect(()=>{
    fetchData();
    const q = query(collection(db, "likes"),where("creatorID","==",userObj.uid),
     orderBy('createdAt','desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
          newArray.push({...doc.data(),id:doc.id})
      });
      newArray.map((likes)=>{
        if(likes.first === movieId){
          setLikeMovie(true)
        }
        else{
          setLikeMovie(false)
        }
      })
      setLike(newArray);
    });
  },[])

  const onDeletclick = async(likeid) =>{
    const ok = window.confirm("좋아요 취소 하시겠습니까?")
    if(ok){
      const data = await deleteDoc(doc(db, "likes", `/${likeid}`));
    }
  }

  const fetchData = async(fetch) =>{
    try{
      const requests = await axios.get(`/movie/${movieId}`,{params:{append_to_response : 'videos'}});
      setMovie(requests.data)

    }catch(error){
      console.log(error.message);
    }
  }
  
  const onLikeClick =async(e)=>{
    if(likeMovie){
      like.map((likes)=>{
        if(likes.first === movieId){
          onDeletclick(likes.id)
        }
      })
      setLikeMovie(false)
    }else{
      const ok = window.confirm("좋아요 목록에 추가")
      if(ok){
        try {      
          const docRef = await addDoc(collection(db, "likes"), {
            first: movieId,
            createdAt: Date.now(),
            creatorID: userObj.uid,
          });
        } catch (e) {
          console.error(e)
        }
        setLikeMovie(true)
      }
    }
  }

  if(!movie) return <div>...loading</div>
  return (
    <section style={{color:"#fff"}} className='detailpage'>
      <div className='movie_image'>
       <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title || movie.original_name} width={300} height={300}/>
      </div>
      <div className='moive_info'>
        <h3>{movie.title || movie.original_name}</h3>
        <p className='modal__datail'>
          <span className='modal__user_perc'>100% for you</span>{"   "}
          {movie.release_date ? movie.release_date : movie.first_air_date}
        </p>
        <p className='modal__details'>평점 : {movie.vote_average}</p>
        {movie.genres &&
          <ul className='madal__genres'>
            {movie.genres.map((genre)=>(
              <li>'{genre.name}'</li>
            ))}
          </ul>
        }
        <p className='modal__overview'>{movie.overview}</p>
        {movie.videos &&
          <ul className='modal__videos'>
            {movie.videos.results.map((vi)=>(
              <li>
                <iframe src={`https://www.youtube.com/embed/${vi?.key}
                  ?controls=1&loop=1&mute=1&playlist=${vi?.key}`} title='Youtube video player'
                  width="120"
                  height="120"></iframe>
              </li>
            ))}
          </ul>
        }
        <ul className='modal__button'>
          <li>
            <FontAwesomeIcon icon={faPlay}/>
            <span>Play Now</span>
          </li>
          <li className={likeMovie && "modal__mylike"} onClick={onLikeClick}>
            <FontAwesomeIcon icon={faHeart} />
            <span>Like</span>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Detailpage