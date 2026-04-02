import React, { useEffect, useState } from 'react'
import { useAuth } from '../stores/authStore'
import { useNavigate } from 'react-router'
import axios from 'axios'

export default function UserProfile() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const currentUser = useAuth(state => state.currentUser)
    const logout=useAuth(state => state.logout)

    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:3000/user-api/articles', { withCredentials: true })
            .then(res => {
                console.log("All Articles : ", res?.data?.payload)
                setArticles(res?.data?.payload || [])
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setError(err.message)
                setLoading(false)
            })
    }, [])

    const handleArticleClick = (article) => {
        console.log("article on click : ",article);
        // navigate('/article', { state: { article } })
        navigate(`/article/${article._id}`, {
      state: article,
    })
    }

    if (loading) return <div className="text-center p-10">Loading articles...</div>
    if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>

    return (
        <div className="p-5">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-bold">User Profile</h1>
                <div className="flex items-center gap-4">
                    {/* Profile image */}
                    {currentUser?.profileImageUrl && (
                        <img
                            src={currentUser.profileImageUrl}
                            alt="Profile"
                            className="w-12 h-12 rounded-full border border-gray-300"
                        />
                    )}
                    <button 
                        className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600"
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            </div>
            
            {/* Grid: 1 col xs, 2 sm, 3 md, 4 lg+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {articles.map(article => (
                    <div 
                        key={article._id}
                        onClick={() => handleArticleClick(article)}
                        className="border border-black rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow bg-white"
                    >
                        <h3 className="bg-amber-300 p-2 rounded mb-2 font-bold">
                            Title: {article.title}
                        </h3>
                        <p className="bg-amber-600 text-white p-2 rounded mb-2">
                            Category: {article.category}
                        </p>
                        <p className="text-gray-700 p-2">
                            Author: {article.author?.firstName || 'Unknown'}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                            {new Date(article.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>

            <button onClick={()=>navigate('author-profile')}>Author profile</button>
            

            {articles.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No articles available</p>
            )}
        </div>
    )
}