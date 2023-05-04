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
      <Row title="Too Rated" id="TR" fetchUrl={requests.fetchTopRated} userObj={userObj}/>
      <Row title="Animation Movies" id="AM" fetchUrl={requests.fetchAnimationMovies} userObj={userObj}/>
      <Row title="Family Movies" id="FA" fetchUrl={requests.fetchFamilyMovies} userObj={userObj}/>
      <Row title="Adventure Movies" id="AD" fetchUrl={requests.fetchAdventureMovies} userObj={userObj}/>
      <Row title="ScienceFiction Movies" id="SC" fetchUrl={requests.fetchScienceFictionMovies} userObj={userObj}/>
      <Row title="Action" id="AC" fetchUrl={requests.fetchAction} userObj={userObj}/>
    </div>
  )
}

export default MainPage