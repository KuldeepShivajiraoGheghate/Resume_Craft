import { useResume } from '../../context/ResumeContext';
import SectionCard from '../ui/SectionCard';

export default function AboutForm() {
  const { resumeData, updateSection } = useResume();
  const about = resumeData.about;
  const maxChars = 500;
  const charCount = about.summary.length;

  const handleChange = (value) => {
    if (value.length <= maxChars) {
      updateSection('about', { summary: value });
    }
  };

  return (
    <SectionCard title="About Me">
      <div className="form-group">
        <label htmlFor="about-summary">Professional Summary</label>
        <textarea
          id="about-summary"
          rows={5}
          placeholder="Write a brief summary about yourself, your experience, and what you bring to the table..."
          value={about.summary}
          onChange={(e) => handleChange(e.target.value)}
        />
        <div className={`char-counter ${charCount > 450 ? (charCount > 480 ? 'danger' : 'warning') : ''}`}>
          {charCount} / {maxChars}
        </div>
      </div>
    </SectionCard>
  );
}
