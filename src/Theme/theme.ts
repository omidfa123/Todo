import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#6200EA',
    },
    secondary: {
      main: '#0D6EFD',
    },
    error: {
      main: '#DC3545',
    },
    info: {
      main: '#fff',
    },
    warning: {
      main: '#ffc107',
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderRight: '1px solid #e0e0e0',
          fontSize: '16px',
        },
      },
    },
  },
});

export default theme;
