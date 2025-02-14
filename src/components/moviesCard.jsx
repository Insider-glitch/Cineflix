import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModals from "./modals/authModals";
import { supabase } from "../lib/supabase";

export default function MoviesCard({ movie }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = async () => {
    if (movie.premium) {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (session?.user) {
        navigate("/frame", { state: { movie } });
      } else {
        setIsLoginModalOpen(true);
      }
    } else {
      navigate("/frame", { state: { movie } });
    }
  };

  return (
    <div>
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
          <div className="mb-2 text-start text-sm font-bold sm:text-lg md:text-xl">
            {movie.name || "Loading..."}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="rounded-md border border-red-800 px-1 py-0 text-center text-sm sm:px-3 sm:py-1 sm:text-base">
              {movie.premium ? "Premium" : "HD"}
            </div>
            <div className="py-0 text-sm sm:py-1 sm:text-base">
              {movie.year || "Year Unknown"}
            </div>
          </div>
        </div>
      </button>

      {isLoginModalOpen && (
        <AuthModals closeModal={() => setIsLoginModalOpen(false)} />
      )}
    </div>
  );
}
