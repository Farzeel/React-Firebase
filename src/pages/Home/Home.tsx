import React, { useEffect, useState } from 'react'
import { collection,getDocs, } from 'firebase/firestore'
import Cart from './Cart'
import { db } from '../../config/firebase';


export interface postsData {
  title:string;
  description:string;
  userId:string;
  username:string;
  id:string
}

const Home = () => {
  const [posts, setPosts] = useState<postsData[] | null>(null)

  const postRef = collection(db,"posts")
  useEffect(() => {
      const getData = async ()=>{
           const posts = await  getDocs(postRef)
           setPosts( posts.docs.map((doc) => ({...doc.data(),id:doc.id})) as postsData[])
           
      }
  
      getData()
     
  }, []);

  return (
    <div>
      {
        posts?.map((post)=>(

          <Cart post={post}/>
        ))
      }
    </div>
  )
}

export default Home
