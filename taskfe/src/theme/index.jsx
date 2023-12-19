import React from 'react';
import PropTypes from 'prop-types';
import { useContext, useMemo, useState } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//
import palette from './palette';
import shadows from './shadows';
import typography from './typography';
import GlobalStyles from './globalStyles';
import customShadows from './customShadows';
import componentsOverride from './overrides';
import { AuthContext } from '../context/AuthContext';
// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(mode === 'light' ? 'dark':'light');
        console.log(mode);
      },
    }),
    [],
  );
  const themeOptions = useMemo(
    () => ({
      palette: {
        mode: mode,
      },
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
    }),
    []
  );


  const theme = createTheme(themeOptions);
  // theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ColorModeContext.Provider value={colorMode}>

        <MUIThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          {children}
        </MUIThemeProvider>
      </ColorModeContext.Provider>
    </StyledEngineProvider>
  );
}
