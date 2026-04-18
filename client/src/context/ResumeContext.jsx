import { createContext, useContext, useState } from 'react';

const defaultResume = {
  profile: {
    name: '', title: '', email: '', phone: '',
    location: '', linkedin: '', github: '', website: '', photo: '',
  },
  about: { summary: '' },
  education: [],
  experience: [],
  projects: [],
  skills: { technical: [], soft: [], languages: [], tools: [] },
  customSections: [],
  template: 'classic',
};

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(defaultResume);
  const [activeSection, setActiveSection] = useState('profile');
  const [savedId, setSavedId] = useState(null);

  const updateSection = (section, data) => {
    setResumeData(prev => ({ ...prev, [section]: data }));
  };

  return (
    <ResumeContext.Provider value={{
      resumeData, setResumeData, updateSection,
      activeSection, setActiveSection,
      savedId, setSavedId
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
