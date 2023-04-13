import React  from 'react'
import Navi from 'commont/Navi';
import 'style/app.css';
import Banner from 'commont/Banner';
import Row from 'commont/Row';
import Footer from 'commont/Footer';
import requests from 'api/requests';
import { Outlet, Route, Routes } from 'react-router-dom';
import MainPage from 'routes/MainPage';
import Detailpage from 'routes/Detailpage';
import Searchpage from 'routes/Searchpage';
//메인에서 디테일 페이지 로우에서 영화눌렀을때 스틸컷 영상
//검색하고 나서도 이름
//검색한걸 누르고나서 디테일 페이지
const Layout = () => {
  //함수형컴포넌트를 만들어줌
  //아울엣이라는 함수가 있음(부모경로에 아울렛을 사용하면 아울렛을 사용한자리에 자식경로를 렌더링 할수 있다)
  return(
    <div>
    <Navi />
    <Outlet />
    <Footer/>
    </div>
  )
}
//다양한 주소값 사용가능 index는 홈 //부모의주소값을 그대로 받게된다
//search 기본값을 기준으로 뒤에 붙는 값
//:movieId :을 :을 쓰고 뒤에 값을 넣어주면 state값을 붙여서 사용할수있음(파람값이라고 생각하면됨)

//https://www.themoviedb.org/ 영화정보사이트
function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage />}/>
          <Route path=':movieId' element={<Detailpage />}/>
          <Route path='search' element={<Searchpage />}/>
        </Route>
      </Routes>

      
      {/* 이전 app
      <Navi />
      <Banner/>
      <Row title="NETFLIX ORIGINALS" id="NO" fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Trending Now" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row title="Too Rated" id="AM" fetchUrl={requests.fetchAnimationMovies} />
      <Footer/> */}
    </div>
  );
}

export default App;
