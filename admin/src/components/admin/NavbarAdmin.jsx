import { useNavigate, Link } from 'react-router-dom';

const NavbarAdmin = () => {
  const navigate = useNavigate();
  const logout = () => {
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-xl">LexEye Admin</div>
      <div className="flex gap-4">
        <Link to="/admin/dashboard" className="text-white hover:underline">Dashboard</Link>
        <Link to="/admin/users" className="text-white hover:underline">Users</Link>
        <Link to="/admin/laws" className="text-white hover:underline">Laws</Link>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
