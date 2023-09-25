import React from 'react';

// COMPONENTS & UTILITIES
import ChatBot from 'containers/chatbot';
import { ThemeProvider } from '@mui/material';
import theme from 'styles/generalCustomTheme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ChatBot />
    </ThemeProvider>
  );
}

export default App;
