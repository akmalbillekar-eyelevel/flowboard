import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { connectSocket, disconnectSocket } from '@/lib/socket';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Clients from '@/pages/Clients';
import ClientDetail from '@/pages/ClientDetail';
import PostForm from '@/pages/PostForm';
import PostDetail from '@/pages/PostDetail';
import Calendar from '@/pages/Calendar';
import Approvals from '@/pages/Approvals';
import Settings from '@/pages/Settings';
import Posts from '@/pages/Posts';
import ClientPortal from '@/pages/ClientPortal';
import LinkInBio from '@/pages/LinkInBio';

export default function App() {
  const token = useAuthStore((s) => s.token);
  const user  = useAuthStore((s) => s.user);

  useEffect(() => {
    if (token) {
      connectSocket();
    } else {
      disconnectSocket();
    }
  }, [token]);

  // CLIENT role — real app Layout but only their 3 pages
  if (token && user?.role === 'CLIENT') {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/bio/:slug" element={<LinkInBio />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/approvals" replace />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/approvals" replace />} />
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/bio/:slug" element={<LinkInBio />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients/:id" element={<ClientDetail />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/new" element={<PostForm />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/approvals" element={<Approvals />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
