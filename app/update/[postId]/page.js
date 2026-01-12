"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
// UPDATE: import db from config file
// UPDATE: import getDoc, updateDoc, doc from firebase/firestore

export default function UpdatePost({ params }) {
  const { postId } = use(params);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // UPDATE: fetch post document using getDoc & doc with db, "posts", postId
        // UPDATE: extract data from document snapshot and set newTitle & newDescription states
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchPost();
  }, []);

  const onUpdatePost = async () => {
    try {
      // UPDATE: update document using updateDoc & doc with db, "posts", postId, setting title to newTitle and description to newDescription
      router.push("/");
    } catch (err) {
      console.error("Error while updating post:", err);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-xl p-8 flex flex-col rounded-lg bg-[#1F1F1F] border border-zinc-600 shadow-lg">
        <h1 className="text-4xl text-gray-200 font-bold mb-8">Update Post</h1>

        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-zinc-400">Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Give your post a title"
              className="p-3 rounded-md bg-[#121212] text-white caret-white border focus:outline-none focus:ring-2 focus:ring-[#FFCA28] border-zinc-600 placeholder-zinc-600"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-zinc-400">Description</label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Share the details..."
              className="min-h-30 resize-none p-3 rounded-md bg-[#121212] text-white caret-white border focus:outline-none focus:ring-2 focus:ring-[#FFCA28] border-zinc-600 placeholder-zinc-600"
            />
          </div>

          <button
            type="button"
            onClick={onUpdatePost}
            className="w-full bg-[#E65100] hover:bg-[#BF360C] text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 cursor-pointer"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
