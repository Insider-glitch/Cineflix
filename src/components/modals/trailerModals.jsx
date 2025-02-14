import React from "react";
import { useLocation } from "react-router-dom";

const TrailerModals = ({ closeModal }) => {
  const location = useLocation();
  const movie = location.state?.movie;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div className="relative h-[40vh] w-[80vw] overflow-hidden rounded-lg border-none bg-neutral-800 p-8 text-white shadow-lg sm:h-[50vh] sm:w-[90vw] md:h-[60vh] md:w-[80vw] lg:h-[70vh] lg:w-[70vw]">
        {/* Close Button */}
        <button
          className="absolute right-3 top-2 text-2xl text-white hover:font-bold hover:text-red-700 focus:outline-none"
          onClick={closeModal}
          aria-label="Close"
        >
          &times;
        </button>
        {/*Trailer Frame*/}
        <iframe
          src={movie.trailer || "#"}
          scrolling="no"
          allowFullScreen
          allow="fullscreen"
          className="h-full w-full transform"
        ></iframe>
      </div>
    </div>
  );
};

export default TrailerModals;
