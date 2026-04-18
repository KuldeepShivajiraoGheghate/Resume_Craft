import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Download, Cloud, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Eye size={20} />,
    title: 'Live Preview',
    description: 'See your resume update in real-time as you type. No refresh needed.',
  },
  {
    icon: <Download size={20} />,
    title: 'PDF Export',
    description: 'Download your polished resume as a print-ready A4 PDF with one click.',
  },
  {
    icon: <Cloud size={20} />,
    title: 'Save to Cloud',
    description: 'Save your resumes to MongoDB and access them anytime, anywhere.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  return (
    <div className="home-page">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="hero-badge">
          <Sparkles size={14} />
          Free & Open Source
        </div>
      </motion.div>

      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Build Your Story. <br />
        <span className="accent">One Section at a Time.</span>
      </motion.h1>

      <motion.p
        className="hero-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Create stunning, professional resumes with our intuitive builder.
        Live preview, PDF export, and cloud storage — all in one place.
      </motion.p>

      <motion.div
        className="hero-cta"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Link to="/builder" className="btn-primary" style={{ fontSize: '16px', padding: '14px 28px' }}>
          Start Building →
        </Link>
        <Link to="/saved" className="btn-ghost" style={{ fontSize: '16px', padding: '14px 28px' }}>
          View Saved
        </Link>
      </motion.div>

      <motion.div
        className="features-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <motion.div key={index} className="feature-card" variants={itemVariants}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
