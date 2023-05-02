import requests from 'api/requests'
import Banner from 'commont/Banner'
import Row from 'commont/Row'
import React from 'react'

function MainPage({userObj}) {
  return (
    <div>
      <Banner/>
      <Row title="NETFLIX ORIGINALS" id="NO" fetchUrl={requests.fetchNetflixOriginals} isLargeRow userObj={userObj}/>
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} userObj={userObj}/>
      <Row title="Trending Now" id="TR" fetchUrl={requests.fetchTopRated} userObj={userObj}/>
      <Row title="Too Rated" id="AM" fetchUrl={requests.fetchAnimationMovies} userObj={userObj}/>
    </div>
  )
}

export default MainPage