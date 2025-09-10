import { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../../api/adminApi';

const UserList = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await fetchUsers();
    setUsers(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this user?')) {
      await deleteUser(id);
      loadUsers();
    }
  };

  useEffect(() => { loadUsers(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">User List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="border-b">
                <td className="py-2 px-4">{u.name}</td>
                <td className="py-2 px-4">{u.email}</td>
                <td className="py-2 px-4">{u.role}</td>
                <td className="py-2 px-4">
                  <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(u._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
