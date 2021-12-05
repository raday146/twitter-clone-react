import { sizes } from "../constants/sizes";
const styles = {
  root: {
    //alignItems: "flex-end !important",
    //flexDirection: "column !important",
    //height: "100vh !important",
    display: "block !important",
    //margin: "10px",
    "& svg": {
      height: 35,
      padding: 2,
      fill: "white",
      alignItems: "center",
    },
    "& span": {
      fontWeight: "lighter",
      lineHeight: 1.5,
    },
  },
  brand: {
    boxShadow: "5px 5px 5px rgba(0,0,0,.1)",
  },
  hedarLinks: {
    fontWeight: "lighter",
    flexDirection: "column !important",
    textDecoration: "none",
    alignItems: "center",
    paddingRight: "4rem !important",
    [sizes.down("lg")]: {
      paddingRight: ".5rem !important",
      // paddingLeft: "3rem !important",
      //flexDirection: "column !important",
    },
  },
  postBtn: {
    margin: "5px",
  },
};
export default styles;
