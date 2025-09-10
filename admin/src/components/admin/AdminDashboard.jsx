import { useEffect, useState } from 'react';
import { fetchUsers, fetchLaws } from '../../api/adminApi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, laws: 0 });

  useEffect(() => {
    const loadStats = async () => {
      const users = await fetchUsers();
      const laws = await fetchLaws();
      setStats({ users: users.data.length, laws: laws.data.length });
    };
    loadStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-3xl font-bold mt-2">{stats.users}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold">Total Laws</h2>
          <p className="text-3xl font-bold mt-2">{stats.laws}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
