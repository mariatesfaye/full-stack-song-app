import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSong, updateSong } from '../redux/slices/songsSlice';

const SongForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || { title: '', artist: '' });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.artist) {
      alert('Please fill in both title and artist fields.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </label>
      <label>
        Artist:
        <input type="text" name="artist" value={formData.artist} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SongForm;
