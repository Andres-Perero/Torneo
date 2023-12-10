// VideoPairTable.js
import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";

const VideoPairTable = ({ pairedVideos, onRestart }) => {
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

  const handleRestart = () => {
    if (pairedVideos.length === 1) {
      setChosenVideos(pairedVideos[0]);
      setShowChosenVideos(true);
      onRestart([]); // Reiniciar el par en el componente padre a un arreglo vacío
    } else {
      const newPairs = formNewPairs();
      onRestart(newPairs);
      setChosenVideos([]);
      setCurrentPairIndex(0);
      setShowChosenVideos(false);
    }
  };

  const formNewPairs = () => {
    const newPairs = [];
    for (let i = 0; i < chosenVideos.length - 1; i += 2) {
      newPairs.push([chosenVideos[i], chosenVideos[i + 1]]);
    }

    if (chosenVideos.length % 2 !== 0) {
      newPairs.push([chosenVideos[chosenVideos.length - 1]]);
    }

    return newPairs;
  };

  const currentPair = pairedVideos[currentPairIndex];

  if (!currentPair) {
    if (showChosenVideos) {
      if (chosenVideos.length === 1) {
        return (
          <div>
            <h2>Winner:</h2>
            <p>
              {chosenVideos[0].number} - {chosenVideos[0].name1} by {chosenVideos[0].author}
            </p>
            <div>
                  <VideoPlayer videoUrl={chosenVideos[0].url} />
                  </div>
          </div>
        );
      } else {
        return (
          <div>
            <h2></h2>
            <div>
              <h3>Winners:</h3>
              <ul>
                {chosenVideos.map((video, index) => (
                  <li key={index}>
                    {video.number} - {video.name1} by {video.author}
                  </li>
                ))}
              </ul>
              {chosenVideos.length > 1 && (
                <button onClick={handleRestart}>Next</button>
              )}
            </div>
          </div>
        );
      }
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

