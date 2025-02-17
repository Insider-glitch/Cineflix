import React from "react";

const EditMovie = ({ movie, onSave, onCancel }) => {
  const [editMovie, setEditMovie] = React.useState({ ...movie });
  console.log("Movie Data in EditMovie:", movie);

  const handleSave = () => {
    if (editMovie.name.trim() && editMovie.year.trim()) {
      const { id, ...movieWithoutId } = editMovie; // Exclude ID
      onSave(movieWithoutId);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditMovie({ ...editMovie, image: file }); // Correctly set the file
    }
  };

  return (
    <tr>
      <td className="border px-4 py-2">{editMovie.id}</td>
      <td className="border px-4 py-2">
        <input
          type="text"
          value={editMovie.name}
          onChange={(e) => setEditMovie({ ...editMovie, name: e.target.value })}
          className="border px-2 py-1 rounded w-full"
        />
      </td>
      <td className="border px-4 py-2">
        <input
          type="text"
          value={editMovie.url}
          onChange={(e) => setEditMovie({ ...editMovie, url: e.target.value })}
          className="border px-2 py-1 rounded w-full"
        />
      </td>
      <td className="border px-4 py-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange} // Handle image change on file selection
          className="border px-2 py-1 rounded w-full"
        />
      </td>
      <td className="border px-4 py-2">
        <input
          type="text"
          value={editMovie.description}
          onChange={(e) =>
            setEditMovie({ ...editMovie, description: e.target.value })
          }
          className="border px-2 py-1 rounded w-full"
        />
      </td>
      <td className="border px-4 py-2">
        <input
          type="text"
          value={editMovie.trailer}
          onChange={(e) => setEditMovie({ ...editMovie, trailer: e.target.value })}
          className="border px-2 py-1 rounded w-full"
        />
      </td>
      <td className="border px-4 py-2">
        <input
          type="text"
          value={editMovie.year}
          onChange={(e) => setEditMovie({ ...editMovie, year: e.target.value })}
          className="border px-2 py-1 rounded w-full"
        />
      </td>
      <td className="border px-4 py-2 text-center">
        <label className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={editMovie.premium}
            onChange={(e) =>
              setEditMovie({ ...editMovie, premium: e.target.checked })
            }
            className="mr-2"
          />
          Premium
        </label>
      </td>
      <td className="border px-4 py-2 flex justify-center gap-2">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditMovie;
