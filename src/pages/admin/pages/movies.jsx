import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import CreateMovie from '../../../components/admin/movies/create';
import ViewMovies from '../../../components/admin/movies/view';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data, error } = await supabase.from('movies').select('*').order("id", { ascending: false });;
      if (error) {
        console.error('Error fetching movies:', error);
      } else {
        setMovies(data);
      }
    };

    fetchMovies();
  }, []);

  const handleAddMovie = async (newMovie) => {
    try {
      const imageUrl = await uploadImageToStorage(newMovie.image);
      const movieWithImage = { ...newMovie, image: imageUrl };
      const { data, error } = await supabase.from('movies').insert([movieWithImage]);
      if (error) {
        console.error('Error adding movie:', error);
      } else {
        setMovies([...movies, ...data]);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const uploadImageToStorage = async (imageFile) => {
    if (!imageFile) {
      throw new Error("No file provided.");
    }
  
    const bucketName = "movie-posters";
    const fileName = `/${Date.now()}-${imageFile.name}`; 
  
  
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, imageFile, {
        cacheControl: '3600',
        upsert: false, 
      });
  
    if (error) {
      console.error("Error uploading file:", error.message);
      throw new Error(error.message);
    }
  
    const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(fileName);
  
    if (!urlData) {
      throw new Error("Error retrieving file URL.");
    }

    return urlData.publicUrl;
  };  
  
  

  const handleDeleteMovie = async (index) => {
    const movieToDelete = movies[index];
    const { error } = await supabase.from('movies').delete().eq('id', movieToDelete.id);
    if (error) {
      console.error('Error deleting movie:', error);
    } else {
      setMovies(movies.filter((_, i) => i !== index));
    }
  };

  const handleSaveMovie = async (index, updatedMovie) => {
    const movieToEdit = movies[index];
    const { data, error } = await supabase
      .from('movies')
      .update(updatedMovie)
      .eq('id', movieToEdit.id);

    if (error) {
      console.error('Error updating movie:', error);
    } else {
      const updatedMovies = [...movies];
      updatedMovies[index] = { ...movieToEdit, ...updatedMovie };
      setMovies(updatedMovies);
      setEditIndex(null);
    }
  };

  const handleEditMovie = (index) => {
    setEditIndex(index);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Movie Management</h1>
      <CreateMovie onAddMovie={handleAddMovie} />
      <ViewMovies
        movies={movies}
        onEdit={handleEditMovie}
        onDelete={handleDeleteMovie}
        editIndex={editIndex}
        onSave={handleSaveMovie}
        onCancel={handleCancelEdit}
      />
    </div>
  );
};

export default MoviesPage;
