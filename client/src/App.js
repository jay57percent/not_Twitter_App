import { useMemo } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
/*Use CreateTheme to envolke the theme with theme setting. 
  Wrap it with the useMemo for expensive calculation, if the state of mode changed, the useMemo hook re-envoke the theme calculation agian  */
/*cssBaseline provides Css reset*/
  const App = () => {
  const mode = useSelector(state => state.mode);
  const isAuth = Boolean(useSelector(state => state.token))
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
