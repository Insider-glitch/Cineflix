import React, { useState, useEffect } from "react";
import MoviesCard from "../../../components/moviesCard";
import { supabase } from "../../../lib/supabase";
import { useSearch } from "../../../context/searchContext";

const MainContent = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useSearch();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("movies")
          .select("id, name, image, url, year, description, premium")
          .eq("premium", false)
          .order("id", { ascending: false });
        if (error) throw error;

        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="flex-grow transition-all duration-300">
      <main className="p-4">
        <h1 className="text-xl font-bold sm:text-2xl">Trending</h1>
        <div className="mt-4 flex h-full justify-center rounded-md p-4">
          {loading ? (
            <p className="text-center text-lg">Loading movies...</p>
          ) : (
            <div className="grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6">
              {movies
                .filter(
                  (item) =>
                    searchQuery.trim() === "" ||
                    item.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase().trim()),
                )
                .map((item) => (
                  <MoviesCard key={item.id} movie={item} />
                ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MainContent;
