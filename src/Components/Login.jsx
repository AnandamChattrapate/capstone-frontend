import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useAuth } from '../stores/authStore'
function Login() {

    const [userData,setUserData]=useState({})
    const {register,handleSubmit,formState:{errors}}=useForm()
    const navigate=useNavigate()
    const isAuthenticated=useAuth(state=>state.isAuthenticated)
    const currentUser=useAuth(state=>state.currentUser)
    const login=useAuth(state=>state.login)
    const profileImageUrl=useAuth(state=>state.profileImageUrl)
    console.log("user ",currentUser);
    console.log("is auth : ",isAuthenticated)
    const handleForm =  async (data) => {
        console.log(data)
         await login(data);
        // setUserData(data)
                  // http://localhost:3000/common-api/authenticate
          //  axios.post('http://localhost:3000/common-api/authenticate',data)
          // .then(res=>{
          //   console.log("SUCCESS ",res)
          //   if (res.data?.payload=='undefined'){
          //     navigate('/login')
          //   }
          //   navigate('/')

          // })
          // .catch(err=>
          //   {
          //   console.log("ERROR : ",err.message);
          // }
          // )
       
    }
    useEffect(()=>{
      if (isAuthenticated){
        if (currentUser?.role=="USER"){
          navigate('/user-profile')
          console.log("profile url : ",profileImageUrl);

        }
        if (currentUser?.role=="AUTHOR"){
          navigate('/author-profile')
        }
      }
    },[isAuthenticated,currentUser])
      

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100"> 
        <form onSubmit={handleSubmit(handleForm)}>
            {/* <div className="flex gap-4">
                user<input type="radio" value='USER' {...register("role")} className="type" />
                admin<input type="radio" value='ADMIN' {...register("role")} className="type" />
            </div> */}
            <input type="email" className="w-full border p-2 rounded m-4"
 placeholder='Email' {...register("email",{required:true}) }/>
             {
                errors.email?.type=='required' && <p> Email required</p>
             }
            <input type="password" {...register("password",{required:true,minLength:4,maxLength:16})}
              placeholder='password' className="w-full border p-2 rounded m-4"
 />
              {
                errors.password?.type=='required' && <p>password required</p>
              }
              {
                errors.password?.type=='minLength' && <p> min length 4</p>
              }
              {
                errors.password?.type=='maxLength' && <p>max length 16</p>
              }
              <button 
                className="min-w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 m-4"
                type='submit'>SUBMIT</button>


        </form>
    </div>
  )
}

export default Login