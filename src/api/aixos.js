import axios from "axios";  //npm install aixos

const instance = axios.create({//aixos 구조로 만들어주기
  baseURL : "https://api.themoviedb.org/3", //계속 반복되는 구문을 install //baseURL 기본주소롤
  params : {// 기본주소/ 다음으로 나오는 글자
    api_key : process.env.REACT_APP_MOVIE_DB_API_KEY,
    language : "ko-KR",//en-US
  }
})

export default instance;