import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const VideoForm = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [number, setNumber] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleName1Change = (event) => {
    setName1(event.target.value);
  };

  const handleName2Change = (event) => {
    setName2(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const videoData = {
      id: uuidv4(),
      name1: name1,
      name2: name2,
      number: number,
      author: author,
      url: url,
    };

    try {
      await axios.post('http://localhost:3001/videos', videoData);
      alert('Información guardada con éxito.');
      setName1('');
      setName2('');
      setNumber('');
      setAuthor('');
      setUrl('');
    } catch (error) {
      console.error('Error al guardar la información:', error);
    }
  };

  return (
    <div>
      <h2>Guardar Información del Video</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del video (opción 1)"
          value={name1}
          onChange={handleName1Change}
        />
        <input
          type="text"
          placeholder="Nombre del video (opción 2)"
          value={name2}
          onChange={handleName2Change}
        />
        <input
          type="text"
          placeholder="Número del video"
          value={number}
          onChange={handleNumberChange}
        />
        <input
          type="text"
          placeholder="Autor del video"
          value={author}
          onChange={handleAuthorChange}
        />
        <input
          type="text"
          placeholder="URL del video"
          value={url}
          onChange={handleUrlChange}
        />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default VideoForm;
