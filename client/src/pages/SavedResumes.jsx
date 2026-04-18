import { useResumeData } from '../hooks/useResumeData';
import { useResume } from '../context/ResumeContext';
import { useNavigate } from 'react-router-dom';
import { downloadPDF } from '../utils/downloadPDF';
import { motion } from 'framer-motion';
import { Trash2, Download, ArrowRight, FileText } from 'lucide-react';

export default function SavedResumes() {
  const { resumes, loading, deleteResume, fetchAll } = useResumeData();
  const { setResumeData, setActiveSection } = useResume();
  const navigate = useNavigate();

  const handleLoad = (resume) => {
    setResumeData({
      profile: resume.profile || { name: '', title: '', email: '', phone: '', location: '', linkedin: '', github: '', website: '', photo: '' },
      about: resume.about || { summary: '' },
      education: resume.education || [],
      experience: resume.experience || [],
      projects: resume.projects || [],
      skills: resume.skills || { technical: [], soft: [], languages: [], tools: [] },
      customSections: resume.customSections || [],
      template: resume.template || 'classic',
    });
    setActiveSection('profile');
    navigate('/builder');
  };

  const handleDelete = async (id) => {
    console.log('Attempting to delete resume with ID:', id);
    try {
      await deleteResume(id);
      console.log('Delete successful, re-fetching...');
      await fetchAll();
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete resume.');
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="saved-page">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="saved-page-title">Saved Resumes</h1>
        <p className="saved-page-subtitle">Manage your saved resumes — load, download, or delete.</p>
      </motion.div>

      {loading ? (
        <div className="saved-grid">
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-line long"></div>
              <div className="skeleton-line short"></div>
              <div className="skeleton-line medium"></div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <div className="skeleton-line" style={{ width: '60px', height: '32px' }}></div>
                <div className="skeleton-line" style={{ width: '60px', height: '32px' }}></div>
              </div>
            </div>
          ))}
        </div>
      ) : resumes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <FileText size={28} />
          </div>
          <h3>No Resumes Yet</h3>
          <p>Start building your first resume to see it here.</p>
          <button className="btn-primary" onClick={() => navigate('/builder')}>
            Create Resume →
          </button>
        </div>
      ) : (
        <motion.div
          className="saved-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {resumes.map((resume, index) => (
            <motion.div
              key={resume._id}
              className="saved-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="saved-card-name">
                {resume.profile?.name || 'Untitled Resume'}
              </div>
              <div className="saved-card-title">
                {resume.profile?.title || 'No title'}
              </div>
              <div className="saved-card-date">
                Created {formatDate(resume.createdAt)}
              </div>
              <div className="saved-card-actions">
                <button className="btn-primary" onClick={() => handleLoad(resume)} style={{ padding: '8px 14px', fontSize: '13px' }}>
                  <ArrowRight size={14} />
                  Load
                </button>
                <button className="btn-ghost" onClick={() => handleDelete(resume._id)} style={{ padding: '8px 14px', fontSize: '13px' }}>
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
