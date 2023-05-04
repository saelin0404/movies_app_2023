import React, { useEffect, useState }  from 'react'
import { Outlet, Route, Routes } from 'react-router-dom';
import 'style/app.css';
import Navi from 'commont/Navi';
import Footer from 'commont/Footer';
import MainPage from 'routes/MainPage';
import Detailpage from 'routes/Detailpage';
import Searchpage from 'routes/Searchpage';
import Auth from 'commont/Auth';
import Myprofile from 'routes/Myprofile';
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";

const Layout = ({userObj}) => {
  return(
    <div>
    <Navi  userObj={userObj}/>
    <Outlet />
    <Footer/>
    </div>
  )
}

function App() {
  const [init,setInit] = useState(false);
  const[isLoggedIn,setIsLOggedIn] = useState(false);
  const [userObj,setUserObj] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(authService, (user) => { 
      if(user){
        setIsLOggedIn(user);
        setUserObj(user);
      } else {
        setIsLOggedIn(false);
      }
      setInit(true)
    });
  },[])

  return (
    <div className='app'>
      <Routes>
        {isLoggedIn ? (
          <Route path='/' element={<Layout userObj={userObj}/>}>
            <Route index element={<MainPage userObj={userObj}/>}/>
            <Route path=':movieId' element={<Detailpage userObj={userObj}/>}/>
            <Route path='search' element={<Searchpage />}/>
            <Route path='myprofile' element={<Myprofile userObj={userObj}/>}/>
          </Route>
        ):(
          <Route path='/' element={<Auth />}></Route>
        )
        }
      </Routes>
    </div>
  );
}

export default App;
