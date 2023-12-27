import React from 'react'

import * as yup from "yup"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { auth, db } from '../../config/firebase'
import { collection,addDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import {useNavigate} from "react-router-dom"



interface CreateFormData{
title:string;
description:string;

}


const Form = () => {

    const navigate = useNavigate()

    const [user] = useAuthState(auth)
    
    const Schema = yup.object().shape({
        title: yup.string().required("title is required"),
        description: yup.string().required("description is required")
    })
    
    const postsRef = collection(db,"posts")
    
    const handlePost = async(data:CreateFormData)=>{
        
     try {
          const post =  await addDoc(postsRef , {
             ...data,
             username:user?.displayName,
             userId:user?.uid
           })
       console.log(post)
           navigate("/")

     } catch (error) {
        console.log(error)
     }
    }

    const {register, handleSubmit, formState:{errors}}  = useForm<CreateFormData>({
        resolver: yupResolver(Schema)
    })
  return (
    <div className='create-post'>
      <form onSubmit={handleSubmit(handlePost)}>
    <input type="text" placeholder='Title' {...register("title")}/>
    <p className='red'>{errors.title?.message}</p>
    <textarea placeholder='Description' {...register("description")}/>
    <p className='red'>{errors.description?.message}</p>
    <input type="submit" />

      </form>
    </div>
  )
}

export default Form
