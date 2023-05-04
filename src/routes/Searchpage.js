import React, { useEffect, useState } from 'react'
import '../style/searchPage.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../api/aixos';
import useDebounce from 'hooks/useDebounce';

function Searchpage() {
  const [searchResults,setSearchResults] = useState([]);
  const navigate = useNavigate();

  const useQuery =() =>{
    return new URLSearchParams(useLocation().search)
  }

  let query = useQuery();
  
  const searchTerm = query.get("q");
  const debounceSearchTerm = useDebounce(searchTerm,500)

  useEffect(()=>{
    if(debounceSearchTerm){
      fetchSearchMovie(debounceSearchTerm);
    }
  },[debounceSearchTerm])

  const fetchSearchMovie = async(searchTerm) =>{
    try{
      const requests = await axios.get(`/search/movie?include_adult=false&query=${debounceSearchTerm}`);
      setSearchResults(requests.data.results)
      
    }catch(error){
      console.log(error.message);
    }
  }
  
  const renderSearchResults=()=>{
    return searchResults.length > 0 ? (
      <section className='search-container'>
        {searchResults.map(movie => {
          if(movie.backdrop_path !== null && movie.media_type !== "person"){
            const movieImageUrl = 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path;
            return(
              <div className='movie' style={{color:'#fff'}}>
                <div className='movie__column-poster' onClick={()=> navigate(`/${movie.id}`)}>
                  <img src={movieImageUrl} alt={movie.title} className='movie__poster'/>
                </div>
                <p>{movie.title || movie.name || movie.original_name}</p>
              </div>
            )
          }
        })}
      </section>
    ) : (
      <section className='no-results'>
        <div className='no-results__text'>
          <p>
            찾고자하는 검색어'{searchTerm}'에 맞는 영화가 없습니다
          </p>
        </div>
      </section>
    )
  }
  return renderSearchResults();
}

export default Searchpage