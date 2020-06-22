import React from "react";
import Button from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { btnStyle, btnBlueStyle } from "./btnStyle";

const useStyles = makeStyles((theme) => ({
  button: btnStyle(theme),
  buttonBlue: btnBlueStyle(theme),
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
