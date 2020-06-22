export const btnStyle = (theme) => {
  return {
    margin: theme.spacing(5),
    position: "absolute",
    zIndex: 10,
    bottom: "1%",
    left: "30%",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    borderRadius: 3,
    
  };
};
export const btnBlueStyle = (theme) => {
  return {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  };
};
