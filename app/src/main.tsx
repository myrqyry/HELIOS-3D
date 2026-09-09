import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { App } from './App';
import { RootErrorBoundary } from './components/RootErrorBoundary';
import './styles/global.css';

document.documentElement.classList.add('js-enabled');

createRoot(document.getElementById('root')!).render(
  <RootErrorBoundary>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </RootErrorBoundary>
);
