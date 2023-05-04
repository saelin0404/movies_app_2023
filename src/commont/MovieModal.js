import React, { useEffect, useRef, useState } from 'react'
import '../style/MovieModal.css'
import useOnClickOutside from 'hooks/useOnClickOutside';
import axios from '../api/aixos';
import { collection, addDoc} from "firebase/firestore";
import { doc, deleteDoc} from "firebase/firestore";
import { db } from 'fbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function MovieModal({setModalOpne,backdrop_path,overview,release_date,title,vote_average,name,id,first_air_date,video,userObj,like}) {
  const ref = useRef();
  useOnClickOutside(ref,()=>{setModalOpne(false)})
  const [likeMovie,setLikeMovie]= useState(false)
  const [movieVideos,setMovieVideos] = useState()

  useEffect(()=>{
    if(video){
      setMovieVideos(video)
    }else{
      setMovieVideos(false)
    }
    like.map((likes)=>{
      if(likes.first === id){
        setLikeMovie(true)
      }
    })
  },[])

  const onDeletclick = async(likeid) =>{
    const ok = window.confirm("좋아요 취소 하시겠습니까?")
    if(ok){
      const data = await deleteDoc(doc(db, "likes", `/${likeid}`));
    }
  }
  
  const onLikeClick = async(e)=>{
    if(likeMovie !== false){
      like.map((likes)=>{
        if(likes.first === id){
          onDeletclick(likes.id)
        }
      })
      setLikeMovie(false)
    }else{
      const ok = window.confirm("좋아요 목록에 추가")
      if(ok){
        try {      
          const docRef = await addDoc(collection(db, "likes"), {
            first: id,
            createdAt: Date.now(),
            creatorID: userObj.uid,
          });
          console.log(docRef);
        } catch (e) {
          console.error(e)
        }
        setLikeMovie(true)
      }
    }
  }

  return (
    <div className='presentation'>
      <div className='wrapper-modal'>
        <div className='modal' ref={ref}>
          <span className='modal-close' onClick={()=>setModalOpne(false)}>X</span>
          <img className='modal__poster_img' src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} alt={title ? title : name} style={{height:500}}/>
          <span onClick={onLikeClick} className={`row__like ${likeMovie && "row__mylike"}`}><FontAwesomeIcon icon={faHeart}/></span>
          <div className='modal__content'>
            <p className='modal__datail'>
              <span className='modal__user_perc'>100% for you</span>{"   "}
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className= 'modal__title'>{title? title:name}</h2>
            <p className='modal__details'>평점 : {vote_average}</p>
            <p className='modal__overview'>{overview}</p>
            {movieVideos !== [] && movieVideos && 
              <>
              <ul className='madal__genres'>
                {movieVideos.genres.map((genre)=>(
                  <li>'{genre.name}'</li>
                ))}
              </ul>
              <ul className='modal__videos'>
                {movieVideos.videos.results.map((vi)=>(
                  <li>
                    <iframe src={`https://www.youtube.com/embed/${vi?.key}
                      ?controls=0&autoplay=1&loop=1&mute=1&playlist=${vi?.key}`} title='Youtube video player'
                      width="120"
                      height="120"></iframe>
                  </li>
                ))}
              </ul>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal