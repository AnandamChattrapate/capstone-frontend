import React, { useEffect } from 'react'
import axios from 'axios'
export default function Logout() {
    // useEffect(()=>{
    //     console.log('useeffect =>')
    //     axios.get('http://localhost:3000/common-api/logout')
    //     .then(res=>{
    //         console.log("logout Success ",res)
    //     })
    //     .catch(err=>{
    //         console.log("error during logout : ",err.message )
    //     })
    // },[])
  return (
    <div>Logout</div>
  )
}
