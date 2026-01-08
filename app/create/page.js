"use client";
import { useState } from "react";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [imageName, setImageName] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    setImageName(file ? file.name : "");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-xl p-8 flex flex-col rounded-lg bg-[#1F1F1F] border border-zinc-600 shadow-lg">
        <h1 className="text-4xl text-gray-200 font-bold mb-8">Create Post</h1>

        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-zinc-400">Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What's on your mind?"
              className="min-h-30 resize-none p-3 rounded-md bg-[#121212] text-white caret-white border focus:outline-none focus:ring-2 focus:ring-[#FFCA28] border-zinc-600 placeholder-zinc-600"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm text-zinc-400">Image</label>
            <label className="flex flex-col items-center justify-center gap-3 w-full h-40 border-2 border-dashed border-zinc-600 rounded-md bg-[#121212] text-zinc-400 hover:border-[#FFCA28] transition-colors duration-200 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <span className="text-sm">Drag and drop or click to upload</span>
              <span className="text-xs text-zinc-500">
                {imageName || "PNG or JPG"}
              </span>
            </label>
          </div>

          <button
            type="button"
            className="w-full bg-[#E65100] hover:bg-[#BF360C] text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 cursor-pointer"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
