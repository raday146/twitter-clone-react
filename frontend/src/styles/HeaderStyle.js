import { sizes } from "../constants/sizes";
const styles = {
  root: {
    display: "block !important",
    "& svg": {
      height: 35,
      padding: 2,
      fill: "white",
      alignItems: "center",
      //display: "flex",
      //cursor: "pointer",
    },
    "& span": {
      fontWeight: "bold",
      lineHeight: 1.5,
      //  display: "contents",
    },
    "& a:hover": {
      backgroundColor: "#e8f5fe",
      borderRadius: "30px",

      // color: "var(--twiter-color)",
      transition: "color 100ms ease-out",
    },
  },
  brand: {
    right: "10px",
    boxShadow: "0 0 0 rgba(0,0,0,.1)",
  },
  hedarLinks: {
    fontWeight: "lighter",
    flexDirection: "column !important",
    textDecoration: "none",
    alignItems: "center",
    //display: "constants",

    paddingRight: "4rem !important",
    [sizes.headerLinksDown("lg")]: {
      paddingRight: ".5rem !important",
    },
  },
  postBtn: {
    margin: "5px",
  },
  badge: {
    //fontSize: "small",
    //fontWeight: "bold",
    //position: "fixed",
    // display: "constants",
    // top: 5,
    //right: 4,
    //left: "unset",
    margin: "1px",
    fontSize: "small",
    display: "contents",
  },
};
export default styles;
