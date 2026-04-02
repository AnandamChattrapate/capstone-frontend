// import React, { useEffect, useState } from 'react'
// import { useAuth } from '../stores/authStore'
// import { useNavigate } from 'react-router'
// import axios from 'axios'

// export default function AuthorProfile() {
//     const [articles, setArticles] = useState([])
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState('')
//     const currentUser = useAuth(state => state.currentUser)
//     const logout = useAuth(state => state.logout)
//     const navigate = useNavigate()

//     useEffect(() => {
//         if (currentUser?._id) {
//             console.log("current user id ",currentUser?._id);
//             setLoading(true)
//             axios.get(`http://localhost:3000/author-api/articles/${currentUser._id}`, 
//                 { withCredentials: true }
//             )
//             .then(res => {
//                 console.log("My Articles : ", res?.data?.payload)
//                 setArticles(res?.data?.payload || [])
//                 setLoading(false)
//             })
//             .catch(err => {
//                 console.log(err)
//                 setError(err.message)
//                 setLoading(false)
//             })
//         }
//     }, [currentUser])

//     const handleArticleClick = (article) => {
//         navigate('/article', { state: { article } })
//     }

//     if (loading) return <div className="text-center p-10">Loading your articles...</div>
//     if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>

//     return (
//         <div className="p-5">
//             <div className="flex justify-between items-center mb-5">
//                 <h1 className="text-2xl font-bold">Author Profile - {currentUser?.firstName}</h1>
//                 <button 
//                     className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
//                     onClick={logout}
//                 >
//                     logout
//                 </button>
//             </div>
            
//             {/* Grid: 1 col xs, 2 sm, 3 md, 4 lg+ */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {articles.map(article => (
//                     <div 
//                         key={article._id}
//                         onClick={() => handleArticleClick(article)}
//                         className="border border-black rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow bg-white"
//                     >
//                         <h3 className="bg-amber-300 p-2 rounded mb-2 font-bold">
//                             Title: {article.title}
//                         </h3>
//                         <p className="bg-amber-600 text-white p-2 rounded mb-2">
//                             Category: {article.category}
//                         </p>
//                         <p className="text-gray-700 p-2 line-clamp-3">
//                             {article.content.substring(0, 100)}...
//                         </p>
//                         <p className="text-xs text-gray-500 mt-2">
//                             {new Date(article.createdAt).toLocaleDateString()}
//                         </p>
//                     </div>
//                 ))}
//             </div>

//             {articles.length === 0 && (
//                 <p className="text-center text-gray-500 mt-10">You haven't written any articles yet</p>
//             )}
//         </div>
//     )
// }
import { NavLink, Outlet } from "react-router";
import { pageWrapper, navLinksClass, navLinkClass, navLinkActiveClass, divider } from "../styles/common";
const emptyStateClass = "text-center text-gray-500 mt-5";
function AuthorProfile() {
  return (
    <div className={pageWrapper}>
      {/* Author Navigation */}
      <div className="flex gap-6 mb-6">
        <NavLink to="articles" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
          Articles
        </NavLink>

        <NavLink to="write-article" className={({ isActive }) => (isActive ? navLinkActiveClass : navLinkClass)}>
          Write Article
        </NavLink>
      </div>

      <div className={divider}></div>

      {/* Nested route content */}
      <Outlet />
    </div>
  );
}

export default AuthorProfile;