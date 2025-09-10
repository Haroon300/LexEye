import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavbarAdmin from './components/admin/NavbarAdmin';
import AdminDashboard from './components/admin/AdminDashboard';
import UserList from './components/admin/UserList';
import LawList from './components/admin/LawList';

function App() {
  return (
    <Router>
      <NavbarAdmin />
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/laws" element={<LawList />} />
      </Routes>
    </Router>
  );
}

export default App;
