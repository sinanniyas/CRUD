import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; // picks up from root .env
console.log("Google Client ID:", clientId); // check if it's defined

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
