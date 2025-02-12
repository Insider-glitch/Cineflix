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
        <div className="absolute right-0 top-0 z-40 h-full w-9 bg-black sm:w-10 md:w-40 lg:w-40 xl:w-56 2xl:w-56"></div>
        <div className="absolute left-0 top-0 z-40 h-full w-9 bg-black sm:w-10 md:w-40 lg:w-40 xl:w-56 2xl:w-56"></div>
        <div className="absolute left-0 top-0 z-40 h-36 w-full bg-black sm:h-36 md:h-36 lg:h-36 xl:h-36 2xl:h-36"></div>
        <div className="absolute bottom-0 left-0 z-40 h-96 w-full bg-black sm:h-72 md:h-56 lg:h-56 xl:h-20 2xl:h-40"></div>
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
  ); // style={{ transform: "scale(1.7) translateX(9%) translateY(1%)" }}
}
