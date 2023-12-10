import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import NextVideoPairTable from "./NextVideoPairTable"; // Componente para seleccionar entre los pares siguientes

const VideoPairTable = ({ pairedVideos, sendChosenVideos }) => {
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [chosenVideos, setChosenVideos] = useState([]);
  const [showChosenVideos, setShowChosenVideos] = useState(false);

  useEffect(() => {
    if (currentPairIndex >= pairedVideos.length) {
      setShowChosenVideos(true);
    }
  }, [currentPairIndex, pairedVideos]);

  const handleChooseVideo = (video) => {
    const updatedChosenVideos = [...chosenVideos, video];
    setChosenVideos(updatedChosenVideos);
    setCurrentPairIndex(currentPairIndex + 1);
  };

  const currentPair = pairedVideos[currentPairIndex];

  if (!currentPair) {
    if (showChosenVideos) {
      return (
        <div>
          <h2>No more videos to choose</h2>
          <div>
            <h3>Selected Videos:</h3>
            <ul>
              {chosenVideos.map((video, index) => (
                <li key={index}>
                  {video.number} - {video.name1} by {video.author}
                </li>
              ))}
            </ul>
          </div>
          <NextVideoPairTable pairedVideos={chosenVideos} sendChosenVideos={sendChosenVideos} />
        </div>
      );
    }
    return null;
  }

  return (
    <div>
      <h2>Choose a Video from the Pair</h2>
      <table>
        <tbody>
          <tr>
            {currentPair.map((video, index) => (
              <React.Fragment key={video.id}>
                <td>
                  <VideoPlayer videoUrl={video.url} />
                </td>
                <td>{video.number}</td>
                <td>{video.name1}</td>
                <td>{video.name2}</td>
                <td>{video.author}</td>
                <td>
                  <button onClick={() => handleChooseVideo(video)}>
                    Choose
                  </button>
                </td>
              </React.Fragment>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VideoPairTable;
