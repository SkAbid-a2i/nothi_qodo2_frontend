import { createTheme } from '@mui/material/styles';

// Color palette
const palette = {
  primary: {
    main: '#E6E6FA', // Lavender
    light: '#f0f0ff',
    dark: '#c0c0e0',
    contrastText: '#000000'
  },
  secondary: {
    main: '#98FB98', // PaleGreen
    light: '#b0ffb0',
    dark: '#7fd07f',
    contrastText: '#000000'
  },
  accent: {
    main: '#66CDAA', // Medium Aquamarine
    light: '#88decc',
    dark: '#44ac88',
    contrastText: '#000000'
  },
  background: {
    default: '#f5f5f5',
    paper: '#ffffff'
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#bdbdbd'
  }
};

// Dark mode palette
const darkPalette = {
  primary: {
    main: '#E6E6FA', // Lavender
    light: '#f0f0ff',
    dark: '#c0c0e0',
    contrastText: '#000000'
  },
  secondary: {
    main: '#98FB98', // PaleGreen
    light: '#b0ffb0',
    dark: '#7fd07f',
    contrastText: '#000000'
  },
  accent: {
    main: '#66CDAA', // Medium Aquamarine
    light: '#88decc',
    dark: '#44ac88',
    contrastText: '#000000'
  },
  background: {
    default: '#121212',
    paper: '#1e1e1e'
  },
  text: {
    primary: '#ffffff',
    secondary: '#b0b0b0',
    disabled: '#808080'
  }
};

const theme = createTheme({
  palette,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      }
    }
  }
});

export default theme;

// Dark theme
export const darkTheme = createTheme({
  palette: darkPalette,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 500
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      }
    }
  }
});