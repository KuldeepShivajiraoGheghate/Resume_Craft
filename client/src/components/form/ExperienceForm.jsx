import { useResume } from '../../context/ResumeContext';
import SectionCard from '../ui/SectionCard';
import { Plus, X } from 'lucide-react';

const emptyExperience = {
  company: '',
  role: '',
  startDate: '',
  endDate: '',
  current: false,
  description: '',
};

export default function ExperienceForm() {
  const { resumeData, updateSection } = useResume();
  const experience = resumeData.experience;

  const handleAdd = () => {
    updateSection('experience', [...experience, { ...emptyExperience }]);
  };

  const handleRemove = (index) => {
    updateSection('experience', experience.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = experience.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    updateSection('experience', updated);
  };

  return (
    <SectionCard title="Experience">
      {experience.map((ex, index) => (
        <div key={index} className="entry-card">
          <div className="entry-card-header">
            <span className="entry-card-title">Experience #{index + 1}</span>
            <button className="btn-icon danger" onClick={() => handleRemove(index)}>
              <X size={14} />
            </button>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor={`exp-company-${index}`}>Company</label>
              <input
                id={`exp-company-${index}`}
                type="text"
                placeholder="Google, Amazon, etc."
                value={ex.company}
                onChange={(e) => handleChange(index, 'company', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`exp-role-${index}`}>Role / Position</label>
              <input
                id={`exp-role-${index}`}
                type="text"
                placeholder="Software Engineer"
                value={ex.role}
                onChange={(e) => handleChange(index, 'role', e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor={`exp-start-${index}`}>Start Date</label>
              <input
                id={`exp-start-${index}`}
                type="text"
                placeholder="Jan 2022"
                value={ex.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
              />
            </div>
            {!ex.current && (
              <div className="form-group">
                <label htmlFor={`exp-end-${index}`}>End Date</label>
                <input
                  id={`exp-end-${index}`}
                  type="text"
                  placeholder="Dec 2023"
                  value={ex.endDate}
                  onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="checkbox-group">
            <input
              id={`exp-current-${index}`}
              type="checkbox"
              checked={ex.current}
              onChange={(e) => handleChange(index, 'current', e.target.checked)}
            />
            <label htmlFor={`exp-current-${index}`}>Currently Working Here</label>
          </div>

          <div className="form-group">
            <label htmlFor={`exp-desc-${index}`}>Description</label>
            <textarea
              id={`exp-desc-${index}`}
              rows={4}
              placeholder="• Led a team of 5 engineers&#10;• Improved system performance by 40%"
              value={ex.description}
              onChange={(e) => handleChange(index, 'description', e.target.value)}
            />
          </div>
        </div>
      ))}

      <button className="add-entry-btn" onClick={handleAdd}>
        <Plus size={16} /> Add Experience
      </button>
    </SectionCard>
  );
}
