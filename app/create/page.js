"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// CREATE: import db, auth from config file
// CREATE: import addDoc, collection, serverTimestamp from firebase/firestore

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const postsCollectionRef = collection(db, "posts");
  // CREATE: initialize postsCollectionRef using collection with db and "posts"
  const router = useRouter();
  const user = auth.currentUser;
  const email = user ? user.email : null;
  // CREATE: get current user from auth, and extract email

  const onCreatePost = async () => {
    try {
      await addDoc(postsCollectionRef, {
        title,
        description,
        created_at: serverTimestamp(),
        user: email,
      });
      // CREATE: add document to posts collection using reference object with title, description, created_at as serverTimestamp(), user as email
      router.push("/");
    } catch (err) {
      console.error("Error while creating post:", err);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-xl p-8 flex flex-col rounded-lg bg-[#1F1F1F] border border-zinc-600 shadow-lg">
        <h1 className="text-4xl text-gray-200 font-bold mb-8">Create Post</h1>

        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-zinc-400">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your post a title"
              className="p-3 rounded-md bg-[#121212] text-white caret-white border focus:outline-none focus:ring-2 focus:ring-[#FFCA28] border-zinc-600 placeholder-zinc-600"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-zinc-400">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Share the details..."
              className="min-h-30 resize-none p-3 rounded-md bg-[#121212] text-white caret-white border focus:outline-none focus:ring-2 focus:ring-[#FFCA28] border-zinc-600 placeholder-zinc-600"
            />
          </div>

          <button
            type="button"
            onClick={onCreatePost}
            className="w-full bg-[#E65100] hover:bg-[#BF360C] text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 cursor-pointer"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
