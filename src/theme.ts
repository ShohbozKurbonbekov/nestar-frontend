"use client";
import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
} from "@mui/material/styles";

const myThemes: ThemeOptions = {
  typography: {
    fontFamily: `var(--font-inter)`,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,

    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },

    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },

    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },

    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },

    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
  },
};

let theme = createTheme(myThemes);

theme = responsiveFontSizes(theme);

export default theme;
