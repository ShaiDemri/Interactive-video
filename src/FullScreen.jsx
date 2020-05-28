import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
}));

const FullScreen = ({ children }) => {
  const classes = useStyles();

  function goFullScreen() {
    var fullscreenElement =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement;
    if (!fullscreenElement) {
      launchIntoFullscreen(document.getElementById("fullscreen"));
    }
  }
  // From https://davidwalsh.name/fullscreen
  // Find the right method, call on correct element
  function launchIntoFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  return (
    <div onClick={goFullScreen} id="fullscreen" className={classes.root}>
      {children}
    </div>
  );
};
export default FullScreen;
