import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import TrailerModals from "../../../components/modals/trailerModals";

export default function Frame() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const movie = location.state?.movie;

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (!movie) {
    return <p>No movie data found.</p>;
  }

  return (
    <div>
      <div className="flex justify-center">
        <img
          className="m-4 block max-h-60 rounded-md bg-red-700 p-1 sm:hidden"
          src={movie.image}
          alt={movie.name}
        />
      </div>
      <div className="flex items-start justify-center p-4">
        <img
          className="m-4 hidden max-h-60 rounded-md bg-red-700 p-1 sm:block"
          src={movie.image}
          alt={movie.name}
        />
        <div>
          <div className="m-4 text-start text-xl font-bold sm:text-2xl">
            {movie.name || ""}
          </div>
          <div className="m-4 flex items-center space-x-3">
            <div className="text-start text-lg sm:text-xl">
              {movie.year || ""}
            </div>
            <button
              className="rounded-md border border-red-800 px-1 py-0 text-center text-sm sm:px-3 sm:py-1 sm:text-base"
              onClick={() => setIsModalOpen(true)} // Open modal on click
            >
              Trailer
            </button>
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
          className="h-[40vh] w-[80vw] overflow-hidden border-none sm:h-[50vh] sm:w-[90vw] md:h-[60vh] md:w-[80vw] lg:h-[70vh] lg:w-[70vw]"
          title={`${movie.name || "Movie"}`}
        />
      </div>

      {/* Trailer Modal */}
      {isModalOpen && <TrailerModals closeModal={handleModalToggle} />}
    </div>
  );
}
