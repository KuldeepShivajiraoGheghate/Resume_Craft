import { motion } from 'framer-motion';

export default function SectionCard({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {title && <h2 className="form-section-title">{title}</h2>}
      {children}
    </motion.div>
  );
}
