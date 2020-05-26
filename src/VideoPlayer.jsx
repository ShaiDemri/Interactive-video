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
    paddingTop: "56.25%" /* 9 / 16 = 0.5625 */,
  },
  player: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
}));
const androidURI =
  "https://play.google.com/store/apps/details?id=com.huuuge.casino.texas&hl=en";
const iosURI =
  "https://apps.apple.com/us/app/billionaire-casino-slots-777/id1098617974";
export default function VideoPlayer() {
  const classes = useStyles();
  const [isPlaying, setIsPlaying] = React.useState(true);
  const play = () => {
    setIsPlaying(true);
  };
  const pause = () => {
    setIsPlaying(false);
  };

  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [showSpinBtn, setShowSpinBtn] = React.useState(false);
  const [showDownloadBtn, setShowDownloadBtn] = React.useState(false);
  const [enterSpinCondition, setEnterSpinCondition] = React.useState(true);
  const vidRef = useRef();
  const handleInactivity = async () => {
    await vidRef.current.seekTo(20.5, "seconds");
    await vidRef.current.seekTo(21, "seconds");
    setShowSpinBtn(false);
    setEnterSpinCondition(false);
    play();
  };
  const handleInactivityCb = React.useCallback(handleInactivity, []);
  let timer = React.useRef();
  const handleTimeJump = React.useCallback(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(handleInactivityCb, 10000); // TODO: W8 10 sec
  }, [handleInactivityCb]);

  React.useEffect(() => {
    if (enterSpinCondition && Math.floor(timeElapsed) === 4) {
      setEnterSpinCondition(false);
      pause();
      setShowSpinBtn(true);
    }
    setShowDownloadBtn(timeElapsed >= 21);
  }, [timeElapsed, isPlaying, showSpinBtn, enterSpinCondition]);
  return (
    <div className={classes.root}>
      <ReactPlayer
        className={classes.player}
        url={billionaireVideo}
        width="100%"
        height="100%"
        controls={true}
        ref={vidRef}
        volume={0.01}
        playing={isPlaying}
        onStart={play}
        style={{ position: "relative" }}
        progressInterval={300}
        onProgress={({ playedSeconds }) => {
          setTimeElapsed(playedSeconds);
        }}
        onSeek={(seconds) => {
          setEnterSpinCondition(seconds < 4);
        }}
      ></ReactPlayer>
      {showSpinBtn ? (
        <OverlayButton
          text="spin"
          color={"blue"}
          icon={LoopIcon}
          onclick={() => {
            clearTimeout(timer.current);
            play();
            setShowSpinBtn(false);
          }}
        >
          {handleTimeJump()}
        </OverlayButton>
      ) : (
        <></>
      )}
      {showDownloadBtn ? (
        <OverlayButton
          text="Download now!"
          icon={GetAppIcon}
          onclick={() => {
            if (isIOS) {
              window.open(iosURI);
            } else {
              window.open(androidURI);
            }
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
