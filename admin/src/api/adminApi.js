import axios from 'axios';

const token = () => localStorage.getItem('adminToken');

export const fetchUsers = () => axios.get('http://localhost:5000/api/admin/users', { headers: { Authorization: `Bearer ${token()}` } });
export const deleteUser = (id) => axios.delete(`http://localhost:5000/api/admin/users/${id}`, { headers: { Authorization: `Bearer ${token()}` } });

export const fetchLaws = () => axios.get('http://localhost:5000/api/admin/laws', { headers: { Authorization: `Bearer ${token()}` } });
export const createLaw = (data) => axios.post('http://localhost:5000/api/admin/laws', data, { headers: { Authorization: `Bearer ${token()}` } });
export const updateLaw = (id, data) => axios.put(`http://localhost:5000/api/admin/laws/${id}`, data, { headers: { Authorization: `Bearer ${token()}` } });
export const deleteLaw = (id) => axios.delete(`http://localhost:5000/api/admin/laws/${id}`, { headers: { Authorization: `Bearer ${token()}` } });
