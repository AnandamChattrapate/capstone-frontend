import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

import {useAuth} from '../stores/authStore'
import '../styles/common.js'
// ─── Forms ────────────────────────────────────────────
 const formCard = "bg-[#f5f5f7] rounded-2xl p-10 max-w-4xl mx-auto";
 const formTitle = "text-2xl font-bold text-[#1d1d1f] tracking-tight text-center mb-7";
 const labelClass = "text-xs font-medium text-[#6e6e73] mb-1.5 block";
 const inputClass ="w-full bg-white border border-[#d2d2d7] rounded-xl px-4 py-2.5 text-[#1d1d1f] text-sm placeholder:text-[#a1a1a6] focus:outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc]/10 transition";
 const formGroup = "mb-4";
 const submitBtn ="w-full bg-[#0066cc] text-white font-semibold py-2.5 rounded-full hover:bg-[#004499] transition-colors cursor-pointer mt-2 text-sm tracking-tight";
 const errorClass ="bg-[#ff3b30]/[0.06] text-[#cc2f26] border border-[#ff3b30]/[0.18] rounded-xl px-4 py-3 text-sm";
 const successClass ="bg-[#34c759]/[0.07] text-[#248a3d] border border-[#34c759]/20 rounded-xl px-4 py-3 text-sm";
 const loadingClass = "text-[#0066cc]/60 text-sm animate-pulse text-center py-10";
 const emptyStateClass = "text-center text-[#a1a1a6] py-16 text-sm";


function WriteArticle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const currentUser=useAuth(state=>state.currentUser)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitArticle = async (articleObj) => {
    setLoading(true);
    console.log("user id : ",currentUser.userId)
    //add authorId to articleObj
    articleObj.author=currentUser.userId;
    try {
        console.log(articleObj)
      await axios.post(
        "http://localhost:3000/author-api/articles",
        articleObj,
        { withCredentials: true }
      );
      toast.success("Article published successfully!");
      reset();
      navigate("/author-profile/articles");

    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to publish article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={formCard}>
      <h2 className={formTitle}>Write New Article</h2>

      <form onSubmit={handleSubmit(submitArticle)}>

        {/* Title */}
        <div className={formGroup}>
          <label className={labelClass}>Title</label>

          <input
            type="text"
            className={inputClass}
            placeholder="Enter article title"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters",
              },
            })}
          />

          {errors.title && (
            <p className={errorClass}>{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div className={formGroup}>
          <label className={labelClass}>Category</label>

          <select
            className={inputClass}
            {...register("category", {
              required: "Category is required",
            })}
          >
            <option value="">Select category</option>
            <option value="technology">Technology</option>
            <option value="programming">Programming</option>
            <option value="ai">AI</option>
            <option value="web-development">Web Development</option>
          </select>

          {errors.category && (
            <p className={errorClass}>{errors.category.message}</p>
          )}
        </div>

        {/* Content */}
        <div className={formGroup}>
          <label className={labelClass}>Content</label>

          <textarea
            rows="8"
            className={inputClass}
            placeholder="Write your article content..."
            {...register("content", {
              required: "Content is required",
              minLength: {
                value: 10,
                message: "Content must be at least 50 characters",
              },
            })}
          />

          {errors.content && (
            <p className={errorClass}>{errors.content.message}</p>
          )}
        </div>

        {/* Submit */}
        <button className={submitBtn} type="submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish Article"}
        </button>

        {loading && (
          <p className={loadingClass}>Publishing article...</p>
        )}
      </form>
    </div>
  );
}

export default WriteArticle;