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
        className="max-w-64 h-full overflow-hidden rounded shadow-lg transition-shadow hover:shadow-2xl flex flex-col"
      >
        <img
          className="w-full h-96 object-cover flex-none"
          src={movie.image || "https://via.placeholder.com/150"}
          alt={`Poster of ${movie.name || "Movie"}`}
        />
        <div className="py-2">
          <div className="mb-2 text-start text-lg font-bold">
            {movie.name || "Loading..."}
          </div>
          <div className="row flex items-center gap-2">
            <div className="rounded-md border border-red-800 px-2 py-1 text-center text-sm">
              {movie.premium ? "Premium" : "HD"}
            </div>
            <div className="py-1 text-sm">{movie.year || "Year Unknown"}</div>
          </div>
        </div>
      </button>

      {isLoginModalOpen && <AuthModals closeModal={() => setIsLoginModalOpen(false)} />}
    </div>
  );
}
