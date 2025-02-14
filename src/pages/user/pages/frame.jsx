import React from "react";
import { useLocation } from "react-router-dom";

export default function Frame() {
  const location = useLocation();
  const movie = location.state?.movie;

  if (!movie) {
    return <p>No movie data found.</p>;
  }

  return (
    <div>
      <div className="flex items-start justify-center p-4">
        <img
          className="m-4 max-h-60 rounded-md bg-red-700 p-1"
          src={movie.image}
        ></img>
        <div>
          <div className="m-4 text-start text-xl font-bold sm:text-2xl">
            {movie.name || ""}
          </div>
          <div className="m-4 text-start text-lg sm:text-xl">
            {movie.year || ""}
          </div>
          <div className="m-4 max-w-4xl text-justify text-sm sm:text-base">
            {movie.description || ""}
          </div>
        </div>
      </div>

      <div className="flex justify-center p-4">
        <iframe
          src={movie.url || "#"}
          scrolling="no"
          allowFullScreen
          allow="fullscreen"
          className="h-[80vh] w-[80vw] overflow-hidden border-none sm:h-[50vh] sm:w-[90vw] md:h-[60vh] md:w-[80vw] lg:h-[70vh] lg:w-[70vw]"
          title={`${movie.name || "Movie"}`}
        />
      </div>
    </div>
  );
}
