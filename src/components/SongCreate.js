import React from 'react';
import { useDispatch } from 'react-redux';
import { createSong } from '../redux/slices/songsSlice';
import SongForm from './SongForm';

const SongCreate = () => {
  const dispatch = useDispatch();

  const handleCreateSong = (formData) => {
    dispatch(createSong(formData))
      .then(() => alert('Song created successfully'))
      .catch((error) => console.error('Error creating song:', error));
  };

  return (
    <div>
      <h2>Create Song</h2>
      <SongForm onSubmit={handleCreateSong} />
    </div>
  );
};

export default SongCreate;
