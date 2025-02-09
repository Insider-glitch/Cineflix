import React from "react";

export default function MoviesModal({ movie, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-screen h-screen max-h-screen w-screen rounded-md bg-white p-5">
        <button
          onClick={onClose}
          className="btn btn-circle btn-ghost btn-md absolute right-5 top-4 z-50 bg-red-700 hover:bg-red-800"
        >
          ✕
        </button>
        <div className="absolute right-0 top-0 z-40 h-full w-24 bg-black"></div>
        <div className="absolute left-0 top-0 z-40 h-full w-24 bg-black"></div>
        <div className="absolute bottom-0 left-0 z-40 block h-4/6 w-full bg-black sm:h-72 md:h-64 lg:h-64 xl:hidden xl:h-24"></div>
        <iframe
          src={movie.url || "#"}
          scrolling="no"
          allowFullScreen
          allow="fullscreen"
          style={{ transform: "scale(1.7) translateX(9%) translateY(1%)" }}
          className="h-full w-full transform"
          title={`${movie.name || "Movie"}`}
        ></iframe>
      </div>
    </div>
  );
}
