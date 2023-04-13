import React, { useRef } from 'react'
import '../style/MovieModal.css'
import useOnClickOutside from 'hooks/useOnClickOutside';

function MovieModal({setModalOpne,backdrop_path,overview,release_date,title,vote_average,name,first_air_date}) {
  const ref = useRef();//id역할(요소를 선택할수있게) 특정 돔을 직접 조작할때 사용한다

  useOnClickOutside(ref,()=>{setModalOpne(false)})//ref값과 함수(창을 닫을수 있는 함수handler) 보내줌
  return (
    <div className='presentation'>
      <div className='wrapper-modal'>
        <div className='modal' ref={ref}>
          <span className='modal-close' onClick={()=>setModalOpne(false)}>X</span>
          <img className='modal__pocter-img' src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} alt={title ? title : name}/>
          <div className='modal__content'>
            <p className='modal__datail'>
              <span className='modal__user_perc'>100% for you</span>{"   "}
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className= 'modal__title'>{title? title:name}</h2>
            <p className='modal__details'>평점 : {vote_average}</p>
            <p className='modal__overview'>{overview}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal