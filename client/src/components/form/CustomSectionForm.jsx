import { useResume } from '../../context/ResumeContext';
import SectionCard from '../ui/SectionCard';
import { Plus, X } from 'lucide-react';

const emptySection = {
  heading: '',
  content: '',
};

export default function CustomSectionForm() {
  const { resumeData, updateSection } = useResume();
  const customSections = resumeData.customSections;

  const handleAdd = () => {
    updateSection('customSections', [...customSections, { ...emptySection }]);
  };

  const handleRemove = (index) => {
    updateSection('customSections', customSections.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = customSections.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    updateSection('customSections', updated);
  };

  return (
    <SectionCard title="Custom Sections">
      {customSections.map((cs, index) => (
        <div key={index} className="entry-card">
          <div className="entry-card-header">
            <span className="entry-card-title">Section #{index + 1}</span>
            <button className="btn-icon danger" onClick={() => handleRemove(index)}>
              <X size={14} />
            </button>
          </div>

          <div className="form-group">
            <label htmlFor={`custom-heading-${index}`}>Section Heading</label>
            <input
              id={`custom-heading-${index}`}
              type="text"
              placeholder="Certifications, Awards, etc."
              value={cs.heading}
              onChange={(e) => handleChange(index, 'heading', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`custom-content-${index}`}>Content</label>
            <textarea
              id={`custom-content-${index}`}
              rows={4}
              placeholder="Describe your achievements, certifications, or any other details..."
              value={cs.content}
              onChange={(e) => handleChange(index, 'content', e.target.value)}
            />
          </div>
        </div>
      ))}

      <button className="add-entry-btn" onClick={handleAdd}>
        <Plus size={16} /> Add Custom Section
      </button>
    </SectionCard>
  );
}
