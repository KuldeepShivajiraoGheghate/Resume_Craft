const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  profile: {
    name: String,
    title: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
    website: String,
    photo: String, // base64 or URL
  },
  about: {
    summary: String,
  },
  education: [
    {
      institution: String,
      degree: String,
      field: String,
      startYear: String,
      endYear: String,
      grade: String,
    }
  ],
  experience: [
    {
      company: String,
      role: String,
      startDate: String,
      endDate: String,
      current: Boolean,
      description: String,
    }
  ],
  projects: [
    {
      title: String,
      description: String,
      techStack: String,
      liveLink: String,
      githubLink: String,
    }
  ],
  skills: {
    technical: [String],
    soft: [String],
    languages: [String],
    tools: [String],
  },
  customSections: [
    {
      heading: String,
      content: String,
    }
  ],
  template: {
    type: String,
    default: 'classic',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Resume', resumeSchema);
