import { useResume } from '../../context/ResumeContext';
import SectionCard from '../ui/SectionCard';
import { Plus, X } from 'lucide-react';

const emptyEducation = {
  institution: '',
  degree: '',
  field: '',
  startYear: '',
  endYear: '',
  grade: '',
};

export default function EducationForm() {
  const { resumeData, updateSection } = useResume();
  const education = resumeData.education;

  const handleAdd = () => {
    updateSection('education', [...education, { ...emptyEducation }]);
  };

  const handleRemove = (index) => {
    updateSection('education', education.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = education.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    updateSection('education', updated);
  };

  return (
    <SectionCard title="Education">
      {education.map((ed, index) => (
        <div key={index} className="entry-card">
          <div className="entry-card-header">
            <span className="entry-card-title">Education #{index + 1}</span>
            <button className="btn-icon danger" onClick={() => handleRemove(index)}>
              <X size={14} />
            </button>
          </div>

          <div className="form-group">
            <label htmlFor={`edu-institution-${index}`}>Institution</label>
            <input
              id={`edu-institution-${index}`}
              type="text"
              placeholder="MIT, Stanford, etc."
              value={ed.institution}
              onChange={(e) => handleChange(index, 'institution', e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor={`edu-degree-${index}`}>Degree</label>
              <input
                id={`edu-degree-${index}`}
                type="text"
                placeholder="B.Tech, M.Sc, etc."
                value={ed.degree}
                onChange={(e) => handleChange(index, 'degree', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`edu-field-${index}`}>Field of Study</label>
              <input
                id={`edu-field-${index}`}
                type="text"
                placeholder="Computer Science"
                value={ed.field}
                onChange={(e) => handleChange(index, 'field', e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor={`edu-start-${index}`}>Start Year</label>
              <input
                id={`edu-start-${index}`}
                type="text"
                placeholder="2020"
                value={ed.startYear}
                onChange={(e) => handleChange(index, 'startYear', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor={`edu-end-${index}`}>End Year</label>
              <input
                id={`edu-end-${index}`}
                type="text"
                placeholder="2024"
                value={ed.endYear}
                onChange={(e) => handleChange(index, 'endYear', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor={`edu-grade-${index}`}>Grade / CGPA</label>
            <input
              id={`edu-grade-${index}`}
              type="text"
              placeholder="9.2 CGPA"
              value={ed.grade}
              onChange={(e) => handleChange(index, 'grade', e.target.value)}
            />
          </div>
        </div>
      ))}

      <button className="add-entry-btn" onClick={handleAdd}>
        <Plus size={16} /> Add Education
      </button>
    </SectionCard>
  );
}
