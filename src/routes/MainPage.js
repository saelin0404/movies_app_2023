import requests from 'api/requests'
import Banner from 'commont/Banner'
import Row from 'commont/Row'
import React from 'react'

function MainPage() {
  return (
    <div>
      <Banner/>
      <Row title="NETFLIX ORIGINALS" id="NO" fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Trending Now" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row title="Too Rated" id="AM" fetchUrl={requests.fetchAnimationMovies} />
    </div>
  )
}

export default MainPage