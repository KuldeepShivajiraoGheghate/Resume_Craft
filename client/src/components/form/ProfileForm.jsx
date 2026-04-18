import { useResume } from '../../context/ResumeContext';
import SectionCard from '../ui/SectionCard';
import { Camera } from 'lucide-react';

export default function ProfileForm() {
  const { resumeData, updateSection } = useResume();
  const profile = resumeData.profile;

  const handleChange = (field, value) => {
    updateSection('profile', { ...profile, [field]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      handleChange('photo', reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <SectionCard title="Profile">
      {/* Photo Upload */}
      <div className="photo-upload">
        {profile.photo ? (
          <img src={profile.photo} alt="Profile" className="photo-preview" />
        ) : (
          <div className="photo-placeholder">
            <Camera size={20} />
          </div>
        )}
        <div>
          <label htmlFor="photo-upload" className="photo-upload-btn" style={{ cursor: 'pointer' }}>
            {profile.photo ? 'Change Photo' : 'Upload Photo'}
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {/* Name & Title */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="profile-name">Full Name</label>
          <input
            id="profile-name"
            type="text"
            placeholder="John Doe"
            value={profile.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="profile-title">Job Title</label>
          <input
            id="profile-title"
            type="text"
            placeholder="Full Stack Developer"
            value={profile.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="profile-email">Email</label>
          <input
            id="profile-email"
            type="email"
            placeholder="john@example.com"
            value={profile.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="profile-phone">Phone</label>
          <input
            id="profile-phone"
            type="tel"
            placeholder="+1 234 567 890"
            value={profile.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>
      </div>

      {/* Location */}
      <div className="form-group">
        <label htmlFor="profile-location">Location</label>
        <input
          id="profile-location"
          type="text"
          placeholder="New York, NY"
          value={profile.location}
          onChange={(e) => handleChange('location', e.target.value)}
        />
      </div>

      {/* Links */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="profile-linkedin">LinkedIn URL</label>
          <input
            id="profile-linkedin"
            type="url"
            placeholder="https://linkedin.com/in/..."
            value={profile.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="profile-github">GitHub URL</label>
          <input
            id="profile-github"
            type="url"
            placeholder="https://github.com/..."
            value={profile.github}
            onChange={(e) => handleChange('github', e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="profile-website">Personal Website</label>
        <input
          id="profile-website"
          type="url"
          placeholder="https://yoursite.com"
          value={profile.website}
          onChange={(e) => handleChange('website', e.target.value)}
        />
      </div>
    </SectionCard>
  );
}
