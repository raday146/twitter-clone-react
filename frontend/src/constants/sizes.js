export const sizes = {
  down(size) {
    const sizes = {
      xxxs: "460.75px",
      xxs: "548.98px",
      xs: "830.98px",
      sm: "998px",
      md: "1017px",
      mmd: "1184px",
      lg: "1265.98px",
      xl: "1524px",
    };
    return `@media (max-width: ${sizes[size]})`;
  },
  headerLinksDown(size) {
    const sizes = {
      xxs: "350.98px",
      xs: "575.98px",
      sm: "767.98px",
      md: "991.98px",
      lg: "1191px",
      xl: "11200",
      xxl: "1384",
      xxxl: "1650px",
    };
    return `@media (max-width: ${sizes[size]})`;
  },
  up(size) {
    const sizes = {
      xxs: "350.98px",
      xs: "575.98px",
      sm: "767.98px",
      md: "991.98px",
      lg: "1191px",
      xl: "11200",
      xxl: "1384",
      xxxl: "1650px",
    };
    return `@media (min-width: ${sizes[size]})`;
  },
};
