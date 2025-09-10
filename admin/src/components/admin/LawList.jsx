import { useEffect, useState } from 'react';
import { fetchLaws, createLaw, updateLaw, deleteLaw } from '../../api/adminApi';

const LawList = () => {
  const [laws, setLaws] = useState([]);
  const [currentLaw, setCurrentLaw] = useState({ title: '', category: '', description: '', _id: null });
  const [showForm, setShowForm] = useState(false);

  const loadLaws = async () => {
    const res = await fetchLaws();
    setLaws(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this law?')) {
      await deleteLaw(id);
      loadLaws();
    }
  };

  const handleEdit = (law) => {
    setCurrentLaw(law);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setCurrentLaw({ title: '', category: '', description: '', _id: null });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (currentLaw._id) await updateLaw(currentLaw._id, currentLaw);
    else await createLaw(currentLaw);
    setShowForm(false);
    loadLaws();
  };

  useEffect(() => { loadLaws(); }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Law Management</h1>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAddNew}>Add Law</button>
      </div>

      {showForm && (
        <div className="bg-white shadow p-4 mb-4 rounded">
          <input type="text" placeholder="Title" className="border p-2 w-full mb-2 rounded" value={currentLaw.title} onChange={e => setCurrentLaw({...currentLaw, title:e.target.value})} />
          <input type="text" placeholder="Category" className="border p-2 w-full mb-2 rounded" value={currentLaw.category} onChange={e => setCurrentLaw({...currentLaw, category:e.target.value})} />
          <textarea placeholder="Description" className="border p-2 w-full mb-2 rounded" rows="3" value={currentLaw.description} onChange={e => setCurrentLaw({...currentLaw, description:e.target.value})}></textarea>
          <div className="flex gap-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>{currentLaw._id ? 'Update' : 'Add'}</button>
            <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={()=>setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {laws.map(l => (
              <tr key={l._id} className="border-b">
                <td className="py-2 px-4">{l.title}</td>
                <td className="py-2 px-4">{l.category}</td>
                <td className="py-2 px-4">{l.description}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => handleEdit(l)}>Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(l._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LawList;
