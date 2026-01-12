"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// LOGOUT: import db, auth from config file
// LOGOUT: import signOut from firebase/auth
// FETCH & DELETE: import collection, getDocs, query, orderBy, deleteDoc, doc from firebase/firestore

export default function Home() {
  const [posts, setPosts] = useState([]);
  // FETCH: initialize postsCollectionRef using collection with db and "posts"
  const router = useRouter();
  // HOME: get current user from auth, and extract email
  const email = null;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // FETCH: create query ordering by created_at descending
        // FETCH: fetch documents using getDocs with the query
        // FETCH: map through documents to extract data and id, then setPosts with the resulting array
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  const handleLogout = async () => {
    try {
      // LOGOUT: call signOut with auth
      router.push("/login");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  const handleDelete = async (postId) => {
    try {
      // DELETE: delete document using deleteDoc & doc with db, "posts", postId
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-[#1F1F1F] border-b border-zinc-600 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-3xl text-[#BF360C] font-bold">Readdit</h1>
          <div className="flex gap-10 items-end">
            <button
              onClick={() => router.push("/create")}
              className="text-gray-200 hover:text-[#FFCA28] hover:cursor-pointer font-semibold transition-colors duration-200"
            >
              Create
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-200 hover:text-[#FFCA28] hover:cursor-pointer font-semibold transition-colors duration-200"
            >
              Logout
            </button>
          </div>
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
                {/* Content */}
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-gray-200">
                      {post.title || "Untitled"}
                    </h2>
                    {email === post.user && (
                      <div className="space-x-3">
                        <button
                          onClick={() => {
                            router.push(`/update/${post.id}`);
                          }}
                          className="bg-[#FFCA28] hover:cursor-pointer rounded-md px-3 py-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(post.id);
                          }}
                          className="bg-[#BF360C] hover:cursor-pointer rounded-md px-3 py-1"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="mt-1 block text-sm text-zinc-500">
                    by {post.user || "Anonymous"}
                  </span>
                  <p className="mt-4 text-gray-300 whitespace-pre-line">
                    {post.description || ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
