import { useResume } from '../../context/ResumeContext';
import { motion } from 'framer-motion';

export default function ResumePreview() {
  const { resumeData } = useResume();
  const { profile, about, education, experience, projects, skills, customSections } = resumeData;

  const sectionAnim = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 },
  };

  return (
    <div id="resume-preview" className="resume-sheet">

      {/* Header */}
      <header className="resume-header">
        {profile.photo && <img src={profile.photo} alt="photo" className="profile-photo" />}
        <div>
          <h1>{profile.name || 'Your Name'}</h1>
          <p className="job-title">{profile.title || 'Job Title'}</p>
          <div className="contact-row">
            {profile.email && <span>✉ {profile.email}</span>}
            {profile.phone && <span>📞 {profile.phone}</span>}
            {profile.location && <span>📍 {profile.location}</span>}
            {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
            {profile.github && <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>}
            {profile.website && <a href={profile.website} target="_blank" rel="noreferrer">Portfolio</a>}
          </div>
        </div>
      </header>

      {/* About */}
      {about.summary && (
        <motion.section {...sectionAnim}>
          <h2 className="section-title">About Me</h2>
          <p>{about.summary}</p>
        </motion.section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <motion.section {...sectionAnim}>
          <h2 className="section-title">Education</h2>
          {education.map((ed, i) => (
            <div key={i} className="entry">
              <div className="entry-header">
                <strong>{ed.institution}</strong>
                <span>{ed.startYear} – {ed.endYear || 'Present'}</span>
              </div>
              <p>{ed.degree}{ed.field ? ` in ${ed.field}` : ''} {ed.grade && `| ${ed.grade}`}</p>
            </div>
          ))}
        </motion.section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <motion.section {...sectionAnim}>
          <h2 className="section-title">Experience</h2>
          {experience.map((ex, i) => (
            <div key={i} className="entry">
              <div className="entry-header">
                <strong>{ex.role}</strong>
                <span>{ex.startDate} – {ex.current ? 'Present' : ex.endDate}</span>
              </div>
              <p className="company">{ex.company}</p>
              {ex.description && (
                <div style={{ whiteSpace: 'pre-line', marginTop: '4px' }}>
                  {ex.description}
                </div>
              )}
            </div>
          ))}
        </motion.section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <motion.section {...sectionAnim}>
          <h2 className="section-title">Projects</h2>
          {projects.map((p, i) => (
            <div key={i} className="entry">
              <div className="entry-header">
                <strong>{p.title}</strong>
                <span className="tech-stack">{p.techStack}</span>
              </div>
              <p>{p.description}</p>
              <div className="project-links">
                {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer">Live ↗</a>}
                {p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer">GitHub ↗</a>}
              </div>
            </div>
          ))}
        </motion.section>
      )}

      {/* Skills */}
      {Object.values(skills).some(arr => arr.length > 0) && (
        <motion.section {...sectionAnim}>
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            {skills.technical.length > 0 && (
              <div className="skills-row">
                <span className="skills-label">Technical</span>
                <span className="skills-value">{skills.technical.join(', ')}</span>
              </div>
            )}
            {skills.soft.length > 0 && (
              <div className="skills-row">
                <span className="skills-label">Soft Skills</span>
                <span className="skills-value">{skills.soft.join(', ')}</span>
              </div>
            )}
            {skills.languages.length > 0 && (
              <div className="skills-row">
                <span className="skills-label">Languages</span>
                <span className="skills-value">{skills.languages.join(', ')}</span>
              </div>
            )}
            {skills.tools.length > 0 && (
              <div className="skills-row">
                <span className="skills-label">Tools</span>
                <span className="skills-value">{skills.tools.join(', ')}</span>
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* Custom Sections */}
      {customSections.map((cs, i) => cs.heading && (
        <motion.section key={i} {...sectionAnim}>
          <h2 className="section-title">{cs.heading}</h2>
          <p style={{ whiteSpace: 'pre-line' }}>{cs.content}</p>
        </motion.section>
      ))}

    </div>
  );
}
