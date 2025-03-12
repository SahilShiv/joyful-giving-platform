
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import FormValidator from '../components/FormValidator';
import '../styles/FormValidator.css';

const Index = () => {
  useEffect(() => {
    document.title = "Form Validation | Client-Side";
  }, []);

  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <FormValidator />
    </motion.div>
  );
};

export default Index;
