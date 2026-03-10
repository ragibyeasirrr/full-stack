import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Approutes from './routes/Approutes';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Hooks/AuthContext ';
import { BookingcartProvider } from './Hooks/bookingcartContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
  < BookingcartProvider >
    <BrowserRouter>
      <Approutes />
    </BrowserRouter>
   </ BookingcartProvider >
    </AuthProvider>
  </StrictMode>
);