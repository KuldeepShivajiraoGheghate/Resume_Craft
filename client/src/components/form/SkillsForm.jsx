import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import SectionCard from '../ui/SectionCard';
import { X } from 'lucide-react';

const SKILL_CATEGORIES = [
  { key: 'technical', label: 'Technical Skills' },
  { key: 'soft', label: 'Soft Skills' },
  { key: 'languages', label: 'Languages' },
  { key: 'tools', label: 'Tools' },
];

export default function SkillsForm() {
  const { resumeData, updateSection } = useResume();
  const skills = resumeData.skills;
  const [inputs, setInputs] = useState({ technical: '', soft: '', languages: '', tools: '' });

  const addSkill = (category, value) => {
    const trimmed = value.trim();
    if (!trimmed || skills[category].includes(trimmed)) return;
    updateSection('skills', {
      ...skills,
      [category]: [...skills[category], trimmed],
    });
    setInputs(prev => ({ ...prev, [category]: '' }));
  };

  const removeSkill = (category, index) => {
    updateSection('skills', {
      ...skills,
      [category]: skills[category].filter((_, i) => i !== index),
    });
  };

  const handleKeyDown = (e, category) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(category, inputs[category]);
    }
  };

  return (
    <SectionCard title="Skills">
      {SKILL_CATEGORIES.map(({ key, label }) => (
        <div key={key} style={{ marginBottom: '20px' }}>
          <div className="tag-input-wrapper">
            <label htmlFor={`skill-${key}`}>{label}</label>
            <input
              id={`skill-${key}`}
              type="text"
              placeholder={`Type a skill and press Enter...`}
              value={inputs[key]}
              onChange={(e) => setInputs(prev => ({ ...prev, [key]: e.target.value }))}
              onKeyDown={(e) => handleKeyDown(e, key)}
            />
          </div>
          <div className="tags-container">
            {skills[key].map((skill, index) => (
              <span key={index} className="tag-chip">
                {skill}
                <button onClick={() => removeSkill(key, index)}>
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
      ))}
    </SectionCard>
  );
}
