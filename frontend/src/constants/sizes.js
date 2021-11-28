export const sizes = {
  down(size) {
    const sizes = {
      xxs: "350.98px",
      xs: "575.98px",
      sm: "767.98px",
      md: "991.98px",
      lg: "1181.98px",
      xl: "1650px",
    };
    return `@media (max-width: ${sizes[size]})`;
  },
};
