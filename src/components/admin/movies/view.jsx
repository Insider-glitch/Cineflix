import React from "react";
import EditMovie from "./edit";
import DeleteMovie from "./delete";

const ViewMovies = ({ movies, onEdit, onDelete, editIndex, onSave, onCancel }) => (
  <table className="w-full border-collapse border border-gray-300 mt-6">
    <thead>
      <tr className="">
        <th className="border px-4 py-2">ID</th>
        <th className="border px-4 py-2">Movie Name</th>
        <th className="border px-4 py-2">URL</th>
        <th className="border px-4 py-2">Image</th>
        <th className="border px-4 py-2">Description</th>
        <th className="border px-4 py-2">Year</th>
        <th className="border px-4 py-2">Premium</th>
        <th className="border px-4 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {movies.map((movie, index) =>
        editIndex === index ? (
          <EditMovie
            key={index}
            movie={movie}
            onSave={(updatedMovie) => onSave(index, updatedMovie)}
            onCancel={onCancel}
          />
        ) : (
          <tr key={index}>
            <td className="border px-4 py-2">{movie.id}</td>
            <td className="border px-4 py-2">{movie.name}</td>
            <td className="border px-4 py-2">{movie.url}</td>
            <td className="border px-4 py-2">
              <img src={movie.image} alt={movie.name} className="h-10 mx-auto" />
            </td>
            <td className="border px-4 py-2">
              {movie.description.length > 20
                ? movie.description.slice(0, 20) + "..."
                : movie.description}
            </td>
            <td className="border px-4 py-2">{movie.year}</td>
            <td className="border px-4 py-2 text-center">
              {movie.premium ? "Yes" : "No"}
            </td>
            <td className="border px-4 py-2 flex justify-center gap-2">
              <button
                onClick={() => onEdit(index)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <DeleteMovie onDelete={() => onDelete(index)} />
            </td>
          </tr>
        )
      )}
    </tbody>
  </table>
);

export default ViewMovies;
