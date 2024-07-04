import { BrowserRouter } from 'react-router-dom';

import { Router } from './Router';
import { Appbar } from './components/Appbar';
import { Toaster } from './components/ui/Toaster';
import { ThemeProvider } from './contexts/ThemeContext';

export function App() {
  return (
      <ThemeProvider>
        <Appbar />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
  );
}
