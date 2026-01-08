"use client";
import { useState, useEffect } from "react";
import { db } from "./config/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(filteredData);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-[#1F1F1F] border-b border-zinc-600 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl text-gray-200 font-bold">MECInsta</h1>
          <button className="text-gray-200 hover:text-[#FFCA28] hover:cursor-pointer font-semibold transition-colors duration-200">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto py-8">
        {posts.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-zinc-500 text-lg">
              No posts yet. Be the first to create one!
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="rounded-lg bg-[#1F1F1F] border border-zinc-600 overflow-hidden shadow-lg"
              >
                {/* User */}
                <div className="px-4 py-4 flex items-center gap-3">
                  <p className="text-gray-200 font-semibold">
                    {post.user || "Anonymous"}
                  </p>
                </div>

                {/* Image */}
                {post.img_url && (
                  <div className="bg-[#121212] max-h-125 overflow-hidden">
                    <img
                      src={post.img_url}
                      alt="Post"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                {/* Caption */}
                <div className="px-6 py-4">
                  <p className="text-gray-200">{post.caption}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
