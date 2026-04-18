import { useResume } from '../../context/ResumeContext';
import SectionCard from '../ui/SectionCard';
import { Plus, X } from 'lucide-react';

const emptyProject = {
  title: '',
  description: '',
  techStack: '',
  liveLink: '',
  githubLink: '',
};

export default function ProjectsForm() {
  const { resumeData, updateSection } = useResume();
  const projects = resumeData.projects;

  const handleAdd = () => {
    updateSection('projects', [...projects, { ...emptyProject }]);
  };

  const handleRemove = (index) => {
    updateSection('projects', projects.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = projects.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    updateSection('projects', updated);
  };

  return (
    <SectionCard title="Projects">
      {projects.map((proj, index) => (
        <div key={index} className="entry-card">
          <div className="entry-card-header">
            <span className="entry-card-title">Project #{index + 1}</span>
            <button className="btn-icon danger" onClick={() => handleRemove(index)}>
              <X size={14} />
            </button>
          </div>

          <div className="form-group">
            <label htmlFor={`proj-title-${index}`}>Project Title</label>
            <input
              id={`proj-title-${index}`}
              type="text"
              placeholder="E-Commerce Platform"
              value={proj.title}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`proj-desc-${index}`}>Description</label>
            <textarea
              id={`proj-desc-${index}`}
              rows={3}
              placeholder="Brief description of the project and your role..."
              value={proj.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`proj-tech-${index}`}>Tech Stack</label>
            <input
              id={`proj-tech-${index}`}
              type="text"
              placeholder="React, Node.js, MongoDB"
              value={proj.techStack}
              onChange={(e) => handleChange(index, 'techStack', e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor={`proj-live-${index}`}>Live Link</label>
              <input
                id={`proj-live-${index}`}
                type="url"
                placeholder="https://myproject.com"
                value={proj.liveLink}
                onChange={(e) => handleChange(index, 'liveLink', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`proj-github-${index}`}>GitHub Link</label>
              <input
                id={`proj-github-${index}`}
                type="url"
                placeholder="https://github.com/..."
                value={proj.githubLink}
                onChange={(e) => handleChange(index, 'githubLink', e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <button className="add-entry-btn" onClick={handleAdd}>
        <Plus size={16} /> Add Project
      </button>
    </SectionCard>
  );
}
