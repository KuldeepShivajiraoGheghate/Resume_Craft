import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/resumes';

export const useResumeData = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL);
      setResumes(res.data);
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveResume = async (data) => {
    const res = await axios.post(BASE_URL, data);
    return res.data;
  };

  const deleteResume = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
    setResumes(prev => prev.filter(r => r._id !== id));
  };

  const loadResume = async (id) => {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  };

  useEffect(() => { fetchAll(); }, []);

  return { resumes, loading, saveResume, deleteResume, loadResume, fetchAll };
};
