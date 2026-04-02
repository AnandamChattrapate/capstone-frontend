import React, { useEffect, useState } from 'react'
import { useForm} from 'react-hook-form'
import { useNavigate } from 'react-router'
import axios from 'axios'
function Register() {
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(false)
    // const [res,setRes]=useState({})
    const [userdata,setUserData]=useState({})
    const [preview,setPreview]=useState();
    const {register,handleSubmit,formState:{errors}}=useForm()
    const navigate=useNavigate();

    // const handleForm = (data) => {
    //     console.log(data)
    //     setUserData(data);
    //     // Create form data object
    //     const formData = new FormData();
    //     //get user object
    //     let { role, profilePic, ...userObj } = data;
    //     //add all fields except profilePic to FormData object
    //     Object.keys(userObj).forEach((key) => {
    //     formData.append(key, userObj[key]);
    //     });
    //     // add profilePic to Formdata object
    //     formData.append("profilePic", profilePic[0]);

    //     if (data?.role=='ADMIN'){
    //       setLoading(true)
    //         let {role,...user}=data

    //        axios.post('http://localhost:3000/author-api/users',user)
    //       .then(res=>{
    //         console.log("SUCCESS ",res)
    //         navigate('/login')

    //       })
    //       .catch((err) => {
    //         console.log("Failed:", error);
    //         setError(err.message)
    //   })
      
    //     }else if(data?.role=="USER"){
    //       setLoading(true)
          
          

    //       // const {role,...user}=data

    //       // Create form data object
    //     const formData = new FormData();
    //     //get user object
    //     let { role, profileImageUrl, ...userObj } = data;
    //     //add all fields except profilePic to FormData object
    //     Object.keys(userObj).forEach((key) => {
    //     formData.append(key, userObj[key]);
    //     });
    //     // add profilePic to Formdata object
    //     formData.append("profilePic", profilePic[0]);

    //        axios.post('http://localhost:3000/user-api/users',user)
    //       .then(res=>{
    //         console.log("SUCCESS ",res)
    //         navigate('/login')
    //       })
    //       .catch((err) => {
    //         console.log("Failed:", error);
    //         setError(err.message)

    //       }).finally(()=>{
    //         setLoading(false)
    //       })
    //       ;
    //     }
        

    // }
  // clean up 
  useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
        },[preview]);


    const handleForm = (data) => {
  setLoading(true);
  setError(null);

  // Create FormData
  const formData = new FormData();

  let { role, profileImageUrl, ...userObj } = data;

  // Append text fields
  Object.keys(userObj).forEach((key) => {
    formData.append(key, userObj[key]);
  });

  // Append image
  if (profileImageUrl && profileImageUrl[0]) {
    formData.append("profilePic", profileImageUrl[0]);
  }

  let url =
    role=="ADMIN"
      ? "http://localhost:3000/author-api/users"
      : "http://localhost:3000/user-api/users";

  axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("SUCCESS", res);
      navigate("/login");
    })
    .catch((err) => {
      console.log("Failed:", err);
      setError(err.message);
    })
    .finally(() => {
      setLoading(false);
    });
};
   

     
    if (loading) return <h1 className='bg-amber-700 h-100%'> LOADING...</h1>;
    // if (error) return <h1 className='bg-amber-700 h-100%'> ERROR in Fetching data</h1>

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
              <div className="bg-white p-6 rounded shadow-md w-80">

        <h1>Register Form</h1>
        {error &&  <h1 className='bg-amber-700 h-100%'> ERROR in Fetching data</h1>}
        <form onSubmit={handleSubmit(handleForm)}>
            <div className="flex gap-4">
                user <input type="radio" value="USER" {...register("role", { required: "Select role" })} />
                admin <input type="radio" value="ADMIN" {...register("role", { required: "Select role" })} />
            </div>
            {
            errors.role && <p>{errors.role.message}</p>
            }
            <input 
               className="w-full border p-2 rounded"
               type="text" {...register("firstName",{required:true,minLength:3,maxLength:8})}
              placeholder='First Name' />
             {
                errors.firstName?.type=='required' && <p>First name required</p>
             }
             {
                errors.firstName?.type=='minLength' && <p>min length 3</p>
             }
             {
                errors.firstName?.type=='maxLength' && <p>max length 8</p>
             }

             <input type="text" {...register("lastName",{required:true,minLength:3,maxLength:10})}
               className="w-full border p-2 rounded"
               placeholder='Last Name' />
             {
                errors.lastName?.type=='required' && <p>Last name required</p>
             }
             {
                errors.lastName?.type=='minLength' && <p>min length 3</p>
             }
             {
                errors.lastName?.type=='maxLength' && <p>max length 8</p>
             }
             <input type="email"  className="w-full border p-2 rounded"
               placeholder='Email' {...register("email",{required:true}) }/>
             {
               errors.email?.type=='required' && <p> Email required</p>
             }
             <input type="password" {...register("password",{required:true,minLength:4,maxLength:16})}
              placeholder='password' className="w-full border p-2 rounded"/>
              {
                errors.password?.type=='required' && <p>password required</p>
              }
              {
                errors.password?.type=='minLength' && <p> min length 4</p>
              }
              {
                errors.password?.type=='maxLength' && <p>max length 16</p>
              }
              {/* <input type="file"
              onChange={}
              {...register("profileImageUrl")}
              placeholder='profile Image Url' className="w-full border p-2 rounded"/> */}
              <input
              type="file"
              accept="image/png, image/jpeg"
              {...register("profileImageUrl")}
              onChange={(e) => {
                  //get image file
                  const file = e.target.files[0];
                  // validation for image format
                  if (file) {
                      if (!["image/jpeg", "image/png"].includes(file.type)) {
                      setError("Only JPG or PNG allowed");
                      return;
                      }
                      //validation for file size
                      if (file.size > 2 * 1024 * 1024) {
                      setError("File size must be less than 2MB");
                      return;
                      }
                      //Converts file → temporary browser URL(create preview URL)
                      const previewUrl = URL.createObjectURL(file);
                      setPreview(previewUrl);
                      setError(null);
                  }

              }} />
              {preview && (
                <div className="mt-3 flex justify-center">
                <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full border"
                />
                </div>
            )}
            <button type='submit'
               className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">SUBMIT</button>
        </form>
        </div>
    </div>
  )
}

export default Register