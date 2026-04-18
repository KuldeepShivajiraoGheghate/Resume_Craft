import { useState, useEffect } from 'react';
import api from '../utils/api';

export const useResumeData = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/resumes');
      setResumes(res.data);
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveResume = async (data) => {
    const res = await api.post('/api/resumes', data);
    return res.data;
  };

  const deleteResume = async (id) => {
    await api.delete(`/api/resumes/${id}`);
    setResumes(prev => prev.filter(r => r._id !== id));
  };

  const loadResume = async (id) => {
    const res = await api.get(`/api/resumes/${id}`);
    return res.data;
  };

  useEffect(() => { fetchAll(); }, []);

  return { resumes, loading, saveResume, deleteResume, loadResume, fetchAll };
};
