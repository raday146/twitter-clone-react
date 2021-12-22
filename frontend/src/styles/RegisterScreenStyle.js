import { sizes } from "../constants/sizes";
const styles = {
  root: {
    maxWidth: "400px",
    marginLeft: "50%",
    marginTop: "50px",
    backgroundColor: "#edf1f76b",
    borderRadius: "10px",
    "& img": {
      padding: "2em",
    },
  },
  tmpImg: {
    paddingRight: "0",
    paddingLeft: "0",
    borderRadius: "5px",
    boxShadow: "0 0 0 1px #fff,0 0 0 .25rem rgba(33,150,243,.25)",
  },
  img: {
    padding: "1rem",
    marginLeft: "initial",
    left: "0",
    right: "50%",
    position: "fixed",
  },
  twSignImg: {
    padding: " 2em",
    height: "98%",
    width: "100%",
    inset: "0px",
    position: "absolute",
    //  opacity: "0",
    zIndex: "-1",
  },
  button: {
    fontWeight: "bold",
    borderRadius: "50%",
    width: "100%",
  },
  homeImg: {
    left: "10%",
    position: "fixed",
    "& img": {
      borderRadius: "5px",
      boxShadow: "0 0 0 1px #fff,0 0 0 .25rem rgba(33,150,243,.25)",
    },
    [sizes.down("lg")]: {
      "& img": {
        width: "400px",
        heigh: "400px",
      },
    },
    [sizes.down("md")]: {
      position: "relative",
    },
    [sizes.down("sm")]: {
      justifyContent: "center",
      display: "flex",
    },
    [sizes.down("xxs")]: {
      width: "200px",
      heigh: "200px",
      left: "20%",
      //right: "20%",
    },
    [sizes.down("xxxs")]: {
      paddingLeft: "40px",
      paddingRight: "40px",
      left: "0",
      right: "10%",
    },
  },
  form: {
    width: "350px",
    right: "10%",
    position: "fixed",
    borderRadius: "5px",
    boxShadow: "0 0 0 1px #fff,0 0 0 .25rem rgba(33,150,243,.25)",
    marginTop: "50px",
    // backgroundColor: "#edf1f76b",
    "& img": {
      padding: "2em",
    },
    [sizes.down("xl")]: {
      width: "400px",
      heigh: "400px",
    },
    [sizes.down("mmd")]: {
      maxWidth: "400px",

      position: "relative",
      left: "10%",
    },
    [sizes.down("sm")]: {
      display: "inherit",
      left: "31%",
    },
    [sizes.down("xs")]: {
      left: "22%",
      right: "0",
    },
    [sizes.down("xxs")]: {
      left: "5%",
    },
    [sizes.down("xxxs")]: {
      width: "300px",
      paddingLeft: "10px",
      heigh: "350px",
      left: "0",
      float: "left",

      //right: "20%",
    },
  },
};
export default styles;
