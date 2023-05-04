import axios from '../api/aixos';
import { useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { doc, deleteDoc} from "firebase/firestore";
import { db } from 'fbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function Likes({first,id}) {
  const [movie,setMovie] = useState({});
  const navigate = useNavigate();
  const [likeMovie,setLikeMovie]= useState(false)

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async(fetch) =>{
    try{
      if(first){
        const requests = await axios.get(`/movie/${first}`)
        setMovie(requests.data)
      }
    }catch(error){
      console.log(error.message);
    }
  }

  const onDeletclick = async(e) =>{
    const ok = window.confirm("'좋아요'목록에서 지우시겠습니까?")
    if(ok){
      const data = await deleteDoc(doc(db, "likes", `/${id}`));
      window.location.href = "https://saelin0404.github.io/movies_app_2023/myprofile"
    }
  }


  if(!movie) return <div>...loading</div>
  return (
    <li key={movie.id}>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
      alt={movie.title || movie.original_name} width={200} height={300}
      onClick={()=> navigate(`/${movie.id}`)}/>
      <h3>{movie.title || movie.original_name}</h3>
      <span onClick={onDeletclick} className= "modal__mylike"><FontAwesomeIcon icon={faHeart}/></span>
    </li>
  )
}

export default Likes