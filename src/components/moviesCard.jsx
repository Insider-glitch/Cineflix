import React, { useState } from "react";
import MoviesModal from "./modals/moviesModal";
import AuthModals from "./modals/authModals";
import { supabase } from "../lib/supabase";

export default function MoviesCard({ movie }) {
  const [isMoviesModalOpen, setIsMoviesModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const handleCardClick = async () => {
    if (movie.premium) {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (session?.user) {
        setIsMoviesModalOpen(true);
      } else {
        setIsLoginModalOpen(true);
      }
    } else {
      setIsMoviesModalOpen(true);
    }
  };

  // Close MoviesModal
  const handleMoviesModalClose = () => {
    setIsMoviesModalOpen(false);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div>
      {/* Movie Card */}
      <button
        onClick={handleCardClick}
        className="flex max-h-full max-w-64 flex-col overflow-hidden rounded shadow-lg transition-shadow hover:shadow-2xl"
      >
        <img
          className="max-h-80 max-w-full flex-none object-cover"
          src={movie.image || "https://via.placeholder.com/150"}
          alt={`Poster of ${movie.name || "Movie"}`}
        />
        <div className="py-2">
          <div className="mb-2 text-start text-base font-bold sm:text-lg md:text-xl">
            {movie.name || "Loading..."}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="rounded-md border border-red-800 px-3 py-1 text-center text-sm sm:text-base">
              {movie.premium ? "Premium" : "HD"}
            </div>
            <div className="py-1 text-sm sm:text-base">
              {movie.year || "Year Unknown"}
            </div>
          </div>
        </div>
      </button>

      {/* Movies Modal */}
      {isMoviesModalOpen && (
        <MoviesModal movie={movie} onClose={handleMoviesModalClose} />
      )}

      {/* Login Modal */}
      {isLoginModalOpen && <AuthModals closeModal={handleLoginModalClose} />}
    </div>
  );
}
