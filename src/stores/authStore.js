import { create } from 'zustand'
import axios from 'axios'
import { useNavigate } from 'react-router';
// const navigate=useNavigate();
export const useAuth = create((set) => ({
    currentUser: null,
    authChecked: false,
    isAuthenticated: false,
    loading: false,
    error: null,
    profileimageUrl:null,
    // role:null,
    isLoggedin: false,
    login: async (userCredWithRole) => {
  const { role, ...userCredObj } = userCredWithRole;

  try {
    set({ loading: true, error: null });

    let res = await axios.post(
      'http://localhost:3000/common-api/authenticate',
      userCredObj,
      { withCredentials: true }
    );

    set({
      loading: false,
      isAuthenticated: true,
      currentUser: res.data.payload,
      profileimageUrl: res.data.payload.profileImageUrl,
      authChecked: true   //  ADD THIS LINE
    });

  } catch (err) {
    set({
      loading: false,
      isAuthenticated: false,
      currentUser: null,
      error: err.response?.data?.error || "Login Failed",
      authChecked: true   
    });
  }
},
    logout: async()=>{
            set({ loading: true, error: null });
            axios.get('http://localhost:3000/common-api/logout',{withCredentials:true})
            set({
                loading: false,
                // role:res?.data?.payload,
                isAuthenticated: true,
                currentUser: res.data.payload
            })
        .then(res=>{
            console.log("logout Success ",res)
            // navigate('/login')
        })
        .catch(err=>{
            console.log("error during logout : ",err.message )
            set({
                loading: false,
                isAuthenticated: false,
                currentUser: null,
                error: err.response?.data?.error || "Login Failed"
            });
        }).finally(
            console.log("finally"),
            set({
                loading:false
            })
        )
    
},reload: async () => {
    console.log("reload called ")
    try {
  set({ loading: true });

  const res = await axios.get(
    // /common-api
    "http://localhost:3000/common-api/check-auth",
    { withCredentials: true }
  );
console.log("res obj in reload ",res)
  set({
    currentUser: res.data.payload,
    isAuthenticated: true,
    loading: false,
    authChecked: true   //  ADD THIS
  });

} catch (err) {
  if (err.response?.status===401) {
    set({
      currentUser: null,
      isAuthenticated: false,
      loading: false,
      authChecked: true   //  ADD THIS
    });
    return;
  }

  console.error("Auth check failed:", err);

  set({
    loading: false,
    authChecked: true   //  ADD THIS (important)
  });
}
  
  }
}
));