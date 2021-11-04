import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from './components/App.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff9505'
    },
    secondary: {
      main: '#e2711d',
      light: '#ffb627'
    }
  }
});

ReactDOM.render(<ThemeProvider theme={theme}><App/></ThemeProvider>, document.getElementById('app'));
