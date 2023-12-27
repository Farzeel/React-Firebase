import React, { useEffect, useState } from 'react'
import { auth, db } from '../../config/firebase'
import { collection,getDocs, addDoc, query, where, deleteDoc,doc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
// import { query } from 'firebase/database';
import {postsData} from "./Home"




interface Likes {
    userId:string;
    likeId:string;
}


interface props {
     
    post:postsData
  
}

const Cart = (props:props) => {

const {post}  =props
const [user] = useAuthState(auth)
const [likes, setLikes] = useState<Likes[] | null>(null)



const likeRef = collection(db,"likes")


const handleLikes =async ()=>{

try {
   const likeDoc =  await addDoc(likeRef , {
        userId:user?.uid,
        postId: post.id
    })
if(user){

    setLikes((prev)=>prev?[...prev,{userId:user?.uid , likeId:likeDoc.id}]:[{userId:user?.uid,likeId:likeDoc.id}])
}

   
} catch (error) {
    console.log(error)
}
}

const removeLike = async()=>{

    try {
         const likeToDeleteQuery = query(likeRef, where("postId", "==",post.id),where("userId","==",user?.uid))
         const likeToDeleteData = await getDocs(likeToDeleteQuery)

         const likeToDelete = doc(db,"likes",likeToDeleteData.docs[0].id)

         await deleteDoc(likeToDelete)
         setLikes((prev)=>prev && prev?.filter(like=>like.likeId !==likeToDeleteData.docs[0].id))


        }
    
        
    catch (error) {
        console.log(error)
    }

}

const postLike =  query(likeRef,where("postId", "==" , post.id))

const getLike = async ()=>{

    const data =await getDocs(postLike)
    setLikes(data.docs.map((doc)=>({userId:doc.data().userId,likeId:doc.id})))
    
}
useEffect(() => {
    getLike();
}, []);

const hasUserLiked = likes?.find((like)=>like.userId ===user?.uid)





  return (
    <div>
  
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <p>@{post.username}</p>
          <button onClick={hasUserLiked? removeLike: handleLikes} className='btnlike' style={{color:hasUserLiked?"red":'black'}}>&hearts;</button>
          <p>likes: {likes?.length}</p>
        </div>

    </div>
  )
}

export default Cart
