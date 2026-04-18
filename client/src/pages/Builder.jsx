import { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileForm from '../components/form/ProfileForm';
import AboutForm from '../components/form/AboutForm';
import EducationForm from '../components/form/EducationForm';
import ExperienceForm from '../components/form/ExperienceForm';
import ProjectsForm from '../components/form/ProjectsForm';
import SkillsForm from '../components/form/SkillsForm';
import CustomSectionForm from '../components/form/CustomSectionForm';
import ResumePreview from '../components/preview/ResumePreview';
import { downloadPDF } from '../utils/downloadPDF';
import { Save, Download } from 'lucide-react';
import axios from 'axios';

const SECTIONS = [
  { id: 'profile', label: 'Profile' },
  { id: 'about', label: 'About Me' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'custom', label: 'Custom Section' },
];

const formMap = {
  profile: <ProfileForm />,
  about: <AboutForm />,
  education: <EducationForm />,
  experience: <ExperienceForm />,
  projects: <ProjectsForm />,
  skills: <SkillsForm />,
  custom: <CustomSectionForm />,
};

export default function Builder() {
  const { resumeData, activeSection, setActiveSection, setSavedId } = useResume();
  const [saving, setSaving] = useState(false);
  const [mobileView, setMobileView] = useState('form');

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await axios.post('http://localhost:5000/api/resumes', resumeData);
      setSavedId(res.data._id);
      alert('Resume saved successfully!');
    } catch (err) {
      alert('Failed to save resume.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle */}
      <div className="mobile-toggle">
        <button
          className={mobileView === 'form' ? 'active' : ''}
          onClick={() => setMobileView('form')}
        >
          Editor
        </button>
        <button
          className={mobileView === 'preview' ? 'active' : ''}
          onClick={() => setMobileView('preview')}
        >
          Preview
        </button>
      </div>

      <div className="builder-layout">
        {/* Left: Section Nav + Form */}
        <div className="form-panel" style={{ display: mobileView === 'preview' ? '' : '' }}>
          <nav className="section-tabs">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                className={`tab-btn ${activeSection === s.id ? 'active' : ''}`}
                onClick={() => setActiveSection(s.id)}
              >
                {s.label}
              </button>
            ))}
          </nav>
          <div className="form-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {formMap[activeSection]}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="action-buttons">
            <button className="btn-primary" onClick={handleSave} disabled={saving}>
              <Save size={16} />
              {saving ? 'Saving...' : 'Save Resume'}
            </button>
            <button
              className="btn-ghost"
              onClick={() => downloadPDF('resume-preview', resumeData.profile.name || 'resume')}
            >
              <Download size={16} />
              Download PDF
            </button>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="preview-panel">
          <ResumePreview />
        </div>
      </div>
    </>
  );
}
