import React from "react";

const DeleteMovie = ({ onDelete }) => (
  <button
    onClick={onDelete}
    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
  >
    Delete
  </button>
);

export default DeleteMovie;
