import { sizes } from "../constants/sizes";
const styles = {
  root: {
    display: "block !important",
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
    right: "10px",
    boxShadow: "0 0 0 rgba(0,0,0,.1)",
  },
  hedarLinks: {
    fontWeight: "lighter",
    flexDirection: "column !important",
    textDecoration: "none",
    alignItems: "center",
    paddingRight: "4rem !important",
    [sizes.headerLinksDown("lg")]: {
      paddingRight: ".5rem !important",
    },
  },
  postBtn: {
    margin: "5px",
  },
};
export default styles;
