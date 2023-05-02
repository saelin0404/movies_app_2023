import Likes from 'commont/Likes'
import React, { useEffect, useState } from 'react'
import { collection, addDoc , onSnapshot ,query, orderBy ,where} from "firebase/firestore";
import { doc, deleteDoc ,updateDoc} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db , storage } from 'fbase';

function Myprofile({userObj}) {
  //기본프로필사진 리스트만들기
  //하트버튼 클릭하면 스토리지에 영화 아이디값저장
  const [like,setLike]=useState([]);
  useEffect(()=>{
    // getTeets();
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

  return (
    <div>
      <span>프로필 이미지</span>
      <span>닉네임</span>
      <div>
        <h2>종아요한 영화</h2>
        <ul>
          {like.map((likes)=>(
            <Likes {...likes}/>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Myprofile