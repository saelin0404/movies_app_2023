import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../api/aixos';
import '../style/searchPage.css'
import useDebounce from 'hooks/useDebounce';

function Searchpage() {
  const [searchResults,setSearchResults] = useState([]);//검색결과 받아오기
  const navigate = useNavigate();

  const useQuery =() =>{
    return new URLSearchParams(useLocation().search) //URLSearchParams을 이용해서 .search값을 가져오게됨
  }
  console.log(useLocation());//브라우저의 기본정보가 객체로 들어와있음

  let query = useQuery();
  //?q=검색어
  
  const searchTerm = query.get("q");
  const debounceSearchTerm = useDebounce(searchTerm,500)//검색한글자랑 시간 넣어줌//이 값을 넣어서 호출
  console.log(searchTerm);
  //q값만 가져오게 된다

  useEffect(()=>{
    if(debounceSearchTerm){//searchTerm -> debounceSearchTerm (성능 향상전 검색어를 입력할때마다 렌더링)
      fetchSearchMovie(debounceSearchTerm);//검색한이름에 해당되는 영화를 불러오는 함수(가로안에 값이 있을때만 즉 공백문자일때는 실행하지않음)
    }
  },[debounceSearchTerm])//검색어가 바뀔때마다

  const fetchSearchMovie = async(searchTerm) =>{
    try{
      const requests = await axios.get(`/search/movie?include_adult=false&query=${debounceSearchTerm}`);//query는 질문  //searchTerm
      console.log(requests); //영화정보
      setSearchResults(requests.data.results)
      
    }catch(error){
      console.log(error.message);
    }
  }

  const renderSearchResults=()=>{
    return searchResults.length > 0 ? (
      //검색결과가 0보다 크다(검색결과가 있다)
      <section className='search-container'>
        {searchResults.map(movie => {
          if(movie.backdrop_path !== null && movie.media_type !== "person"){//포스터가 없으면 div가 표시 되지않음(에러메세지가 나오지않게)
            const movieImageUrl = 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path;
            return(
              <div className='movie'>
                <div className='movie__column-poster' onClick={()=> navigate(`/${movie.id}`)}>{/*영화아이디값 보내줌*/}
                  <img src={movieImageUrl} alt={movie.title} className='movie__poster'/>
                </div>
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
  return renderSearchResults();//함수 호출
}

export default Searchpage