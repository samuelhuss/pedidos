import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/Toaster';

import { Router } from './Router';
import { Appbar } from './components/Appbar';
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
