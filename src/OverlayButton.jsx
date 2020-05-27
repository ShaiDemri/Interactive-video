import React from "react";
import Button from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(5),
    position: "absolute",
    zIndex: 99999999999999,
    bottom: "1%",
    left: "30%",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    borderRadius: 3,

    WebkitAppearance: "none",
    MozAppearance: "none",
    appearance: "none",
  },
  buttonBlue: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  },
}));

export default function OverlayButton({
  text,
  onclick,
  icon,
  color = "primary",
}) {
  const classes = useStyles();
  const Icon = icon;
  return (
    <Button
      variant="extended"
      size="small"
      color={color}
      className={clsx(classes.button, {
        [classes.buttonBlue]: color === "blue",
      })}
      onClick={onclick}
    >
      <Icon />
      {text}
    </Button>
  );
}
