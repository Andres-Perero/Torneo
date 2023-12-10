import React, { useState, useEffect } from "react";
import "./VideoTable.css"; // Importa el archivo CSS
import VideoPairTable from "./VideoPairTable"; // Asegúrate de importar el componente VideoPairTable
import VideoPlayer from "./VideoPlayer";

const VideoTable = ({ data }) => {
  const [videos, setVideos] = useState(data); // Establece el estado inicial con los datos del archivo JSON
  const [pairedVideos, setPairedVideos] = useState([]);
  const [showOriginalList, setShowOriginalList] = useState(true);

  const handleRestart = (newPairs) => {
    setPairedVideos(newPairs); // Actualizar los pares en el estado del componente padre
  };
  const sendVideosToPairTable = () => {
    const paired = [];
    for (let i = 0; i < videos.length - 1; i += 2) {
      paired.push([videos[i], videos[i + 1]]);
    }

    if (videos.length % 2 !== 0) {
      paired.push([videos[videos.length - 1]]);
    }

    setPairedVideos(paired);
    setShowOriginalList(false);
  };
  const shuffleVideos = () => {
    const shuffled = [...videos].sort(() => Math.random() - 0.5); // Ordena la lista de forma aleatoria
    setPairedVideos([]); // Limpia los pares seleccionados previamente
    setShowOriginalList(true); // Vuelve a mostrar la lista original
    setVideos(shuffled); // Actualiza la lista de videos con el orden aleatorio
  };
  useEffect(() => {
    if (data && Array.isArray(data)) {
      // Verifica si data.videos es un array antes de asignarlo a videos
      setVideos(data);
    }
  }, [data]);
  return (
    <div>
      <h2>Openings One Piece</h2>
      <div className="button-container">
        {showOriginalList && (
          <>
            <button className="play-button" onClick={sendVideosToPairTable}>
              <i className="fas fa-play"></i> Jugar
            </button>

            <button className="random-button" onClick={shuffleVideos}>
              <i className="fas fa-random"></i> Ordenar aleatorio
            </button>
          </>
        )}
      </div>
      {showOriginalList && (
        <table>
          <thead>
            <tr>
              <th>Reproductor de Video</th>
              <th>Opening</th>
              <th>Titulo</th>
              <th>Titulo - Kanji</th>
              <th>Autor</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video.id}>
                <td>{video.url && <VideoPlayer videoUrl={video.url} />}</td>
                <td>{video.number}</td>
                <td>{video.name1}</td>
                <td>{video.name2}</td>
                <td>{video.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {pairedVideos.length > 0 && (
        <VideoPairTable pairedVideos={pairedVideos} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default VideoTable;
