import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from "react-player";
import { isIOS } from "react-device-detect";
import LoopIcon from "@material-ui/icons/LoopOutlined";
import GetAppIcon from "@material-ui/icons/GetApp";

import billionaireVideo from "./assets/billionaire_v2.mp4";
import OverlayButton from "./OverlayButton";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "100%",
  },
  player: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
}));
const START_TRACKING_PIXEL_URL =
  "http://www.mocky.io/v2/5be098b232000072006496f5";
const END_TRACKING_PIXEL_URL =
  "http://www.mocky.io/v2/5be098d03200004d006496f6";

const androidURI =
  "https://play.google.com/store/apps/details?id=com.huuuge.casino.texas&hl=en";
const iosURI =
  "https://apps.apple.com/us/app/billionaire-casino-slots-777/id1098617974";

const VIDEO_SCHEDULE = {
  spin: 4,
  download: 21,
};
const USER_INACTIVE_TIME = 10000;

export default function VideoPlayer() {
  const classes = useStyles();
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [showSpinBtn, setShowSpinBtn] = React.useState(false);
  const [showDownloadBtn, setShowDownloadBtn] = React.useState(false);
  const [enterSpinCondition, setEnterSpinCondition] = React.useState(true);
  const vidRef = useRef();

  const handleInactivity = async () => {
    await vidRef.current.seekTo(21, "seconds");
    setShowSpinBtn(false);
    setEnterSpinCondition(false);
    play();
  };
  const handleInactivityCb = React.useCallback(handleInactivity, []);
  let timer = React.useRef();
  const handleTimeJump = React.useCallback(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(handleInactivityCb, USER_INACTIVE_TIME);
  }, [handleInactivityCb]);

  React.useEffect(() => {
    if (showSpinBtn) {
      handleTimeJump();
    }
  }, [showSpinBtn, handleTimeJump]);
  React.useEffect(() => {
    if (enterSpinCondition && Math.floor(timeElapsed) === VIDEO_SCHEDULE.spin) {
      setEnterSpinCondition(false);
      pause();
      setShowSpinBtn(true);
    }
    setShowDownloadBtn(timeElapsed >= VIDEO_SCHEDULE.download);
  }, [timeElapsed, isPlaying, showSpinBtn, enterSpinCondition]);
  const play = () => {
    setIsPlaying(true);
  };
  const pause = () => {
    setIsPlaying(false);
  };
  const fireTrackingPixel = (url) => {
    fetch(url);
  };
  const onSpinClick = () => {
    clearTimeout(timer.current);
    play();
    setShowSpinBtn(false);
  };
  const onDownloadClick = () => {
    if (isIOS) {
      window.open(iosURI);
    } else {
      window.open(androidURI);
    }
  };
  return (
    <div className={classes.root}>
      <ReactPlayer
        className={classes.player}
        url={billionaireVideo}
        width="100%"
        height="100%"
        controls={true}
        playsinline={true}
        ref={vidRef}
        volume={0.01}
        playing={isPlaying}
        onStart={() => {
          play();
          fireTrackingPixel(START_TRACKING_PIXEL_URL);
        }}
        onEnded={() => {
          fireTrackingPixel(END_TRACKING_PIXEL_URL);
        }}
        style={{ position: "relative" }}
        progressInterval={300}
        onProgress={({ playedSeconds }) => {
          setTimeElapsed(playedSeconds);
        }}
        onSeek={(seconds) => {
          setEnterSpinCondition(seconds < 4);
        }}
        config={{
          file: {
            attributes: { controlslist: "nofullscreen" },
          },
        }}
      ></ReactPlayer>
      {showSpinBtn ? (
        <OverlayButton
          text="spin"
          color={"blue"}
          icon={LoopIcon}
          onclick={onSpinClick}
        ></OverlayButton>
      ) : (
        <></>
      )}
      {showDownloadBtn ? (
        <OverlayButton
          text="Download now!!!"
          icon={GetAppIcon}
          onclick={onDownloadClick}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
