import Likes from 'commont/Likes'
import React, { useEffect, useState } from 'react'
import { db , storage,authService } from 'fbase';
import '../style/mypage.css'
import { updateProfile } from 'firebase/auth'
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString ,getDownloadURL } from "firebase/storage";
import { collection, onSnapshot ,query, orderBy ,where} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCheck, faHeart, faPencil, faSignOut } from '@fortawesome/free-solid-svg-icons';
import img from 'img/asset2.png'


function Myprofile({userObj}) {
  const [attachment,setAttachment]= useState(userObj.photoURL);
  const [newDisplayName,setNewDisplayName] = useState(userObj.displayName);
  const [like,setLike]=useState([]);
  const [myprofile,setMyprofile]=useState([]);
  const [editImg,setEditImg]=useState(false);
  const [editName,setEditName]=useState(false);

  const navigate = useNavigate();
  const onLogOutClick = ()=>{
    authService.signOut();
    navigate('/')
  }

  useEffect(()=>{
    const q = query(collection(db, "likes"),where("creatorID","==",userObj.uid),
     orderBy('createdAt','desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
          newArray.push({...doc.data(),id:doc.id})
      });
      setLike(newArray);
    });
  },[])

  useEffect(()=>{
    const q = query(collection(db, "profile"),
     orderBy('createdAt','desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
          newArray.push({...doc.data(),id:doc.id})
      });
      setMyprofile(newArray);
    });
  },[])


  const onProfileSubmit = async (e)=>{
    e.preventDefault();
    try {
      let attachmentUrl = "";
      if(attachment !== ""){ 
        const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(storageRef, attachment, 'data_url'); 
        attachmentUrl = await getDownloadURL(ref(storage, response.ref))
        await updateProfile(userObj,{photoURL:attachmentUrl})
      }
    } catch (e) {
      console.error(e)
    }
    setEditImg(false)
  }

  const onChange = (e)=>{
    console.log(e);
    const {target:{files}} = e;
    const thefile = files[0]

    const reader = new FileReader();
    reader.onloadend = (finishdedEvent)=>{ 
      const {currentTarget:{result}} = finishdedEvent
      setAttachment(result);
    }
    reader.readAsDataURL(thefile)
  }


  //사용자 이름변경
  const onChangeName = (e)=>{
    const{target:{value}} = e;
    setNewDisplayName(value)
  }

  const onSubmitName = async(e)=>{
    if(userObj.displayName !== newDisplayName){
      await updateProfile(userObj,{displayName:newDisplayName})
    }
  }
  const onChangeProfile=async(Url)=>{
    setAttachment(Url);
    await updateProfile(userObj,{photoURL:Url})
    setEditImg(false)
  }

  return (
    <div className='mypage'>
      <div className='mypage__myProfile'>
        <h2>My Profile</h2>
        <div className='myProfile_image'>
          <span className='myprofile_img' style={attachment !== null? {backgroundImage: `url(${attachment})`} : {backgroundImage:`url(${img})`}}></span>
          <span className='myprofile_edit' onClick={()=>setEditImg(true)}><FontAwesomeIcon icon={faPencil}/></span>
          {editImg &&
            <div className='myprofile_select'>
              <ul>
                {myprofile.map((profile)=>(
                  <li style={myprofile ? {backgroundImage: `url(${profile.attachmentUrl})`} : {}} onClick={()=>onChangeProfile(profile.attachmentUrl)}></li>
                ))}
              </ul>
              <form onSubmit={onProfileSubmit}>
                <label htmlFor='filechange' className='select_img'>
                  <FontAwesomeIcon icon={faCamera}/>
                  <span>사진 선택</span>
                </label>
                <input type='file' id='filechange' onChange={onChange} style={{display:'none'}}/>
                <label htmlFor='filesubmit'>
                  <span>저장</span>
                  <FontAwesomeIcon icon={faCheck}/>
                </label>
                <input type='submit' id='filesubmit' style={{display:'none'}}/>
              </form>
            </div>
          }
        </div>
        <div className='myprofile_names'>
          {!editName ? (
            <>
              <span className='myprofile_name'>{newDisplayName !== null ? `${newDisplayName}`:"User Name"}</span>
              <span className='myprofile_edit' onClick={()=>setEditName(true)}><FontAwesomeIcon icon={faPencil}/></span>
            </>
          ):(
            <form onSubmit={onSubmitName} className='namechange'>
            <input type='text' value={newDisplayName} onChange={onChangeName}/>
            <label htmlFor='namesubmit'>
                <FontAwesomeIcon icon={faCheck}/>
              </label>
              <input type='submit' id='namesubmit' style={{display:'none'}}/>
          </form>
          ) 
          }
        </div>
        <span className='logOut' onClick={onLogOutClick}><FontAwesomeIcon icon={faSignOut}/> <span>Log Out</span> </span>
      </div>
      <div className='mypage__likes'>
        <h2><FontAwesomeIcon icon={faHeart}/> LIKE List</h2>
        <ul className='mypage__like'>
          {like.map((likes)=>( 
            <Likes {...likes} userObj={userObj}/>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Myprofile