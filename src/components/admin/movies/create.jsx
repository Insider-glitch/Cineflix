import React, { useState } from "react";

const CreateMovie = ({ onAddMovie }) => {
  const [newMovie, setNewMovie] = useState({
    name: "",
    url: "",
    image: null,
    description: "",
    year: "",
    trailer: "",
    premium: false, // Added premium field
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewMovie({ ...newMovie, image: file });
  };

  const handleAddMovie = () => {
    if (
      newMovie.name.trim() &&
      newMovie.year.trim() &&
      newMovie.trailer.trim() &&
      newMovie.image &&
      newMovie.description.trim()
    ) {
      onAddMovie(newMovie);
      setNewMovie({
        name: "",
        url: "",
        image: null,
        description: "",
        year: "",
        trailer: "",
        premium: false, // Reset premium field
      });
    }
  };

  return (
    <div className="mb-4 border p-4 rounded">
      <h2 className="text-xl font-semibold mb-3">Add a New Movie</h2>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={newMovie.name}
          onChange={(e) => setNewMovie({ ...newMovie, name: e.target.value })}
          placeholder="Movie Name"
          className="border px-2 py-1 rounded w-full"
        />
        <input
          type="text"
          value={newMovie.url}
          onChange={(e) => setNewMovie({ ...newMovie, url: e.target.value })}
          placeholder="URL"
          className="border px-2 py-1 rounded w-full"
        />
        <input
          type="file"
          onChange={handleImageChange}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          type="text"
          value={newMovie.year}
          onChange={(e) => setNewMovie({ ...newMovie, year: e.target.value })}
          placeholder="Year"
          className="border px-2 py-1 rounded w-full"
        />
        <input
          type="text"
          value={newMovie.trailer}
          onChange={(e) => setNewMovie({ ...newMovie, trailer: e.target.value })}
          placeholder="Trailer"
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      <textarea
        value={newMovie.description}
        onChange={(e) =>
          setNewMovie({ ...newMovie, description: e.target.value })
        }
        placeholder="Description"
        className="border px-2 py-1 rounded w-full mt-2"
      ></textarea>
              <label className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={newMovie.premium}
            onChange={(e) =>
              setNewMovie({ ...newMovie, premium: e.target.checked })
            }
            className="mr-2"
          />
          Premium Movie
        </label>
      <button
        onClick={handleAddMovie}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
      >
        Add Movie
      </button>
    </div>
  );
};

export default CreateMovie;
