const { createTheme } = require('@mui/material');

const theme = createTheme({
  palette: {
    primary: {
      main: '#006faf',
    },
  },

  typography: {
    h6: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
  },
});

export default theme;
