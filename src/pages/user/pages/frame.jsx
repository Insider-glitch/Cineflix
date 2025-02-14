import React from "react";
import { useLocation } from "react-router-dom";

export default function Frame() {
  const location = useLocation();
  const movie = location.state?.movie;

  if (!movie) {
    return <p>No movie data found.</p>;
  }

  return (
<iframe
  src={movie.url || "#"}
  scrolling="no"
  allowFullScreen
  allow="fullscreen"
  className="h-[400px] w-[620px] overflow-hidden border-none"
  title={`${movie.name || "Movie"}`}
/>

  );
}
