import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faPlay, faPause, faExpand, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import { HeaderAbsolute, HeaderStatic } from '../common/headers';
import ReactPlayer from "react-player";
import Duration from "./tools";
import "./video.css"
import screenfull from "screenfull";
import { FastAverageColor } from "fast-average-color";

export default function VideoNew() {

  const pointer = { cursor: "pointer" };
  const [song, setSong] = useState([{
  }])
  const fac = new FastAverageColor();
  const params = useParams();
  const [videoId, setVideoId] = useState(params.id)
  useEffect(() => {
    fetch(`http://192.168.0.112:8000/video/${videoId}`).then((response) => response.json()).then((data) => {
      setCurrentSong(data[0])
      const post = new Image() 
      post.crossOrigin = "anonymous"
      post.src = "http://192.168.0.112:8000" + data[0].cover
      console.log("loading")
      fac.getColorAsync(post).then(color => console.log(color))
      setPoster(post)
    });
  }
    , [videoId])

  let mediaRef = useRef(null)
  let videoRef = useRef(null)

  const [songs, setSongs] = useState(song);
  const [ready, setReady] = useState(true)
  const [volume, setVolume] = useState(1)
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [played, setPlayed] = useState(0)
  const [controls, setControls] = useState(false)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setFullscreen] = useState(false)

  const videoCover = "http://192.168.0.112:8000" + currentSong.cover
  const [poster, setPoster] = useState(new Image())
  const loadNext = () => {
    setVideoId(currentSong.next)
  }
  const loadPrev = () => {
    setVideoId(currentSong.prev)
  }

  (poster)

  
  

  const handleSeekChange = (e) => {
    setPlayed(parseFloat(e.target.value))
    mediaRef.current.seekTo(parseFloat(e.target.value))
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }
  const handleDuration = (duration) => {
    setDuration(duration)
  }
  const handleProgress = (state) => {
    console.log("played")
    setPlayed(state.played)
  }
  const readyHandler = () => {
    console.log("ready")
    setReady(false)
  }
  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value))
  }
  const handleClickFullscreen = () => {
    setFullscreen(!isFullscreen)
    if (!isFullscreen) {
      screenfull.request()
    }
    else {
      screenfull.exit()
    }
    console.log(isFullscreen)
  }
  return (
    <div className={`h-full  ${isFullscreen ? "text-white" : ""}`}>
      <div className="h-full overflow-hidden w-3/5 mx-auto ">
        <div className="h-20  relative">

          {isFullscreen ? <HeaderAbsolute /> : <HeaderStatic />}
        </div>
        <div className="h-full ">
          <div className={`${isFullscreen ? "fullscreen-video" : ""} h-3/4 flex flex-col justify-center items-center `}>
            <div className="h-4/5 w-full mx-auto bg-slate-50  shadow-lg rounded-lg">
              <ReactPlayer
                config={{
                  file: {
                    attributes: {
                      poster: videoCover
                    }
                  }
                }}
                url={(currentSong.video == "/None") ? "http://192.168.0.112:8000" + currentSong.audio : "http://192.168.0.112:8000" + currentSong.video}
                ref={mediaRef}
                width="100%"
                height="100%"
                controls={controls}
                volume={volume}
                className="p-10"
                onReady={readyHandler}
                playing={isPlaying}
                onEnded={loadNext}
                onProgress={handleProgress}
                onDuration={handleDuration}
              />
            </div>
            <div className="h-1/6 w-1/2  flex flex-col justify-center items-center">
              <span className="  text-xl md:text-2xl font-bold z-10"><a href={"/author/" + currentSong.author_id}>{currentSong.author}</a></span>
              <span className=" text-md md:text-xl z-10">{currentSong.name}</span>
            </div>
          </div>
          <div className=" flex flex-col justify-center relative z-10">
            <input
              type='range' min={0} max={0.999999} step='any' className="shadow-lg my-3 accent-gray-800  h-3 w-full "
              value={played}
              disabled={ready}
              onChange={handleSeekChange}
            />
            <div className="flex flex-row justify-between">
              <Duration seconds={duration * played} />
              <Duration seconds={duration} />
            </div>
            <div className="flex flex-row justify-between m-3">
              <div className="relative group">
                <FontAwesomeIcon
                  icon={faVolumeUp}
                  size="2x"
                />
                <input type='range' className="absolute hidden accent-gray-800 p-1 group-hover:inline-block" min={0} max={1} step='any' value={volume} onChange={handleVolumeChange} />
              </div>
              <div>
                <FontAwesomeIcon
                  onClick={loadPrev}
                  className="skip-back mx-5 drop-shadow-lg"
                  icon={faAngleLeft}
                  size="2x"
                  style={pointer}
                />
                <FontAwesomeIcon
                  onClick={handlePlayPause}
                  className="play mx-5 drop-shadow-lg"
                  icon={isPlaying ? faPause : faPlay}
                  size="2x"
                  style={pointer}
                />
                <FontAwesomeIcon
                  onClick={loadNext}
                  className="skip-forward mx-5 drop-shadow-lg"
                  icon={faAngleRight}
                  size="2x"
                  style={pointer}
                />
              </div>
              <div>
                <FontAwesomeIcon
                  onClick={handleClickFullscreen}
                  icon={faExpand}
                  size="2x"
                  style={pointer}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}