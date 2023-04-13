import React, { useEffect } from 'react'

function useOnClickOutside(ref,handler) {
  useEffect(()=>{
    console.log(ref);//객체에 속성으로 ref값을 받은 엘리멘트를 가져오게 됨
    const listener =(event) =>{
      if(!ref.current || ref.current.contains(event.target)){//모달창이 없거나 모달창안에 내가 누른 타켓을 포함하고 있으면
        //모달창이 안 닫히는 경우
        return;//함수 끝내기
      }
      //닫히기 (event)=>{setModalOpne(false)}
      handler(event);
    }
    document.addEventListener("mousedown",listener)
    document.addEventListener("touchstart",listener)
  },[ref,handler])
}

export default useOnClickOutside