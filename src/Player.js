import React from "react";
import "./Player.css";

const Player = props => {
  const backgroundStyles = {
    backgroundImage: props.item ? `url(${ props.item.album.images[0].url })` : ' '
  };
  const progressBarStyles = {
    width: props.item ? (props.progress_ms * 100 / props.item.duration_ms) + '%' : '0%'
  };
  const albumImage = props.item ? props.item.album.images[0].url : "";
  const artistName = props.item ? props.item.artists[0].name : "";
  const songName   = props.item ? props.item.name : " - ";
  const playingStatus = props.is_playing ? "Playing" : "Paused";
  // console.log(" -> " + props.is_playing);

  return (
    <div className="App" >
      <div className="main-wrapper">
        <div className="now-playing__img">
          <img src={albumImage} alt="" />
        </div>
        <div className="now-playing__side">
          <div className="now-playing__name">{songName}</div>
          <div className="now-playing__artist">{artistName}</div>
          <div className="now-playing__status">{playingStatus}</div>
          <div className="progress">
            <div className="progress__bar" style={progressBarStyles} />
          </div>
        </div>
        <div className="background" alt={props.progress_ms} style={backgroundStyles} />{" "}
      </div>
    </div>
  );
}

export default Player;
