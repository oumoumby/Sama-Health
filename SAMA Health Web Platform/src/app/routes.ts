import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { LandingPage } from './pages/LandingPage';
import { HospitalDirectory } from './pages/HospitalDirectory';
import { HospitalDetail } from './pages/HospitalDetail';
import { TicketPurchase } from './pages/TicketPurchase';
import { AppointmentBooking } from './pages/AppointmentBooking';
import { AuthPage } from './pages/AuthPage';
import { Dashboard } from './pages/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: 'hopitaux', Component: HospitalDirectory },
      { path: 'hopitaux/:id', Component: HospitalDetail },
      { path: 'ticket', Component: TicketPurchase },
      { path: 'rendez-vous', Component: AppointmentBooking },
      { path: 'auth', Component: AuthPage },
      { path: 'dashboard', Component: Dashboard },
    ],
  },
]);
