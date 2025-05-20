import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import SignUpSuccess from './pages/auth/SignUpSuccess';
import CreatePasswordPage from './pages/auth/createPasswordPage';
import SignUpPending from './pages/auth/SignUpPending';

// Layout
import AppLayout from './pages/layout/AppLayout';

// Admin
import ProfileAdmin from './pages/profiles/admin/ProfileAdmin';
import InscriptionPage from './pages/inscription/inscriptions';

// Employee
import ProfileEmployee from './pages/profiles/employee/ProfileEmployee';

// SuperAdmin
import ProfileSuperAdmin from './pages/profiles/superAdmin/ProfileSuperAdmin';

// Badges
import DemandeBadgeForm from './pages/badges/DemandeBadgeForm';
import ListeBadgesEmploye from './pages/badges/ListeBadgesEmploye';
import ValidationFormAdmin from './pages/badges/ValidationFormAdmin';

// Notifications
import NotificationPage from './pages/notifications/NotificationPage';

// ProtectedRoute
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages personnalisées
import UtilisateurPage from './pages/utilisateur/UtilisateurPage.jsx';

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signup-success" element={<SignUpSuccess />} />
      <Route path="/signup-pending" element={<SignUpPending />} />
      <Route path="/create-password/:token" element={<CreatePasswordPage />} />

      {/* EMPLOYEE */}
      <Route path="/employee" element={<ProtectedRoute allowedRoles={['EMPLOYEE']} />}>
        <Route element={<AppLayout />}>
          <Route index element={<ProfileEmployee />} />
          <Route path="profile" element={<ProfileEmployee />} />
          <Route path="badges" element={<ListeBadgesEmploye />} />
          <Route path="demandes" element={<DemandeBadgeForm />} />
          <Route path="rdvs" element={<div>Employee RDVs Page</div>} />
          <Route path="notifications" element={<NotificationPage />} />
        </Route>
      </Route>

      {/* ADMIN */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']} />}>
        <Route element={<AppLayout />}>
          <Route index element={<ProfileAdmin />} />
          <Route path="profile" element={<ProfileAdmin />} />
          <Route path="badges" element={<ValidationFormAdmin />} />
          <Route path="demandes" element={<div>Admin Demandes Page</div>} />
          <Route path="rdvs" element={<div>Admin RDVs Page</div>} />
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="utilisateurs" element={<div>Admin Utilisateurs Page</div>} />
          <Route path="inscription" element={<InscriptionPage />} />
        </Route>
      </Route>

      {/* SUPERADMIN */}
      <Route path="/superadmin" element={<ProtectedRoute allowedRoles={['SUPERADMIN']} />}>
        <Route element={<AppLayout />}>
          <Route index element={<ProfileSuperAdmin />} />
          <Route path="profile" element={<ProfileSuperAdmin />} />
          <Route path="badges" element={<ValidationFormAdmin />} />
          <Route path="demandes" element={<div>SuperAdmin Demandes Page</div>} />
          <Route path="rdvs" element={<div>SuperAdmin RDVs Page</div>} />
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="utilisateurs" element={<UtilisateurPage />} />
          <Route path="roles" element={<div>SuperAdmin Roles Page</div>} />
          <Route path="departements" element={<div>SuperAdmin Departements Page</div>} />
        </Route>
      </Route>

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
