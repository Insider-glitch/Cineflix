import React from "react";

export default function MoviesModal({ movie, onClose }) {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-screen h-screen max-h-screen w-screen rounded-md bg-white p-5">
        <button
          onClick={onClose}
          className="btn btn-circle btn-ghost btn-md absolute right-1 top-20 z-50 bg-red-700 hover:bg-red-800"
        >
          ✕
        </button>
        <iframe
          src={movie.url || "#"}
          scrolling="no"
          allowFullScreen
          allow="fullscreen"
          className="h-full w-full transform"
          title={`${movie.name || "Movie"}`}
        ></iframe>
      </div>
    </div>
  );
}
