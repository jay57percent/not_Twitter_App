// color design tokens export
export const colorTokens = {
  grey: {
    0: "#FEF3F3",
    10: "#FDE9E9",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#293060",
    900: "#181C36",
    1000: "#000000",
  },
  primary: {
    50: "#E6FBFF",
    100: "#CCF7FE",
    200: "#99EEFD",
    300: "#F6E669 ",
    400: "#33DDFB",
    500: "#00D5FA",
    600: "#00A0BC",
    700: "#006B7D",
    800: "#00353F",
    900: "#001519",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              dark: colorTokens.primary[300],
              main: colorTokens.primary[300],
              light: colorTokens.primary[800],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
          }
        : {
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Caveat", "sans-serif"].join(","),
      fontSize: 14,
      h1: { fontSize: 40 },
      h2: { fontSize: 32 },
      h3: { fontSize: 24 },
      h4: { fontSize: 20 },
      h5: { fontSize: 16 },
      h6: { fontSize: 14 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            ...(mode === "dark" ? {
              '&.Mui-disabled': {
                color: colorTokens.grey[500], // Adjust as needed for dark mode
              },
            } : {
              '&.Mui-disabled': {
                color: colorTokens.grey[300], // Adjust as needed for light mode
              },
            }),
          },
          
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === "dark" ? colorTokens.grey[900] : colorTokens.grey[10],
            color: mode === "dark" ? colorTokens.grey[300] : colorTokens.grey[900],
          },
        },
      },
    },
  };
};
