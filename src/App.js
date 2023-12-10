import React from 'react';
import VideoTable from './VideoTable';
import data from './db.json'; // Importa el archivo JSON

function App() {
  return (
    <div className="App">
      <VideoTable data={data.videos} /> {/* Pasa el objeto JSON 'data' como una propiedad 'data' a VideoTable */}
    </div>
  );
}

export default App;
