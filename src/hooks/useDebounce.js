import React, { useEffect, useState } from 'react'

//사용자정의 훅함수를 만들때는 주로 앞에 'use'를 붙여서 파일을 만들어 사용
function useDebounce(value,delay) {
  //검색어가 하나하나 입력될때마다 입력값이 렌더링되면 성능저하가 있기때문에 훅함수를 만들어서 검색어가 완성될때까지 기다려줌
  const [debounceValue,setDebounceValue] = useState(value)

  useEffect(()=>{//화면이 다 그려지고 실행되기 때문에 이 함수 사용
    const handler = setTimeout(()=>{
      setDebounceValue(value)
    },delay)//딜레이 시간만큼 지날때까지 입력값이 변하지 않으면 스테이함수에 입력값을 넣어줌

    //딜레이시간이 지나기전에 다시 입력값이 들어왔을때 그전에 입력한 값으로 실행되고 있던 셋타임아웃 함수가 리턴문을 통해 실행을 멈추고 그다음 입력한 값을 합친 타임아웃함수가 실행됨
    //더이상 사용이 되지 않을때 리턴문사용
    return ()=>{//업데이트되기 직전에 실행
      clearTimeout(handler)
    }

  },[value,delay])//입력값이 바뀔때마다,딜레이 시간이 바뀔때마다

  return debounceValue //바뀐 입력값을 내보내줌
}

export default useDebounce