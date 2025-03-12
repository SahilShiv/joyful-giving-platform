
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';

const FormValidator = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    hobbies: [] as string[],
    otherHobby: '',
    email: '',
    note: ''
  });

  // Error states
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    hobbies: '',
    email: '',
    note: ''
  });

  // Touched states to only show errors after user interaction
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    birthDate: false,
    hobbies: false,
    email: false,
    note: false
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle checkbox changes
  const handleHobbyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData(prev => ({
        ...prev,
        hobbies: [...prev.hobbies, value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        hobbies: prev.hobbies.filter(hobby => hobby !== value)
      }));
    }
  };

  // Handle field blur
  const handleBlur = (field: string) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  // Validate form on data change
  useEffect(() => {
    const newErrors = {
      firstName: formData.firstName ? '' : 'First name is required',
      lastName: formData.lastName ? '' : 'Last name is required',
      birthDate: formData.birthDate ? '' : 'Birth date is required',
      hobbies: formData.hobbies.length > 0 ? '' : 'Select at least one hobby',
      email: !formData.email 
        ? 'Email is required' 
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) 
          ? 'Please enter a valid email address' 
          : '',
      note: formData.note ? '' : 'Note is required'
    };
    
    setErrors(newErrors);
  }, [formData]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched to show all errors
    setTouched({
      firstName: true,
      lastName: true,
      birthDate: true,
      hobbies: true,
      email: true,
      note: true
    });

    // Check if form is valid
    const isValid = Object.values(errors).every(error => error === '');
    
    if (isValid) {
      // Form would be submitted here
      console.log('Form submitted:', formData);
      
      // Show success message
      alert('Form submitted successfully!');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        birthDate: '',
        hobbies: [],
        otherHobby: '',
        email: '',
        note: ''
      });
      
      // Reset touched states
      setTouched({
        firstName: false,
        lastName: false,
        birthDate: false,
        hobbies: false,
        email: false,
        note: false
      });
    } else {
      console.log('Form has errors');
    }
  };

  // Get today's date in YYYY-MM-DD format for max date attribute
  const today = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="form-container">
      <motion.div 
        className="form-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="form-header">
          <motion.span 
            className="chip"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Personal Information
          </motion.span>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Registration Form
          </motion.h1>
        </div>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <motion.div
                className={`input-container ${touched.firstName && errors.firstName ? 'error' : ''}`}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={() => handleBlur('firstName')}
                  placeholder="Enter your first name"
                />
              </motion.div>
              <AnimatePresence>
                {touched.firstName && errors.firstName && (
                  <motion.span 
                    className="error-message"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.firstName}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <motion.div
                className={`input-container ${touched.lastName && errors.lastName ? 'error' : ''}`}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={() => handleBlur('lastName')}
                  placeholder="Enter your last name"
                />
              </motion.div>
              <AnimatePresence>
                {touched.lastName && errors.lastName && (
                  <motion.span 
                    className="error-message"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {errors.lastName}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="birthDate">Birth Date</label>
            <motion.div
              className={`input-container ${touched.birthDate && errors.birthDate ? 'error' : ''}`}
              whileTap={{ scale: 0.98 }}
            >
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                max={today}
                value={formData.birthDate}
                onChange={handleChange}
                onBlur={() => handleBlur('birthDate')}
              />
            </motion.div>
            <AnimatePresence>
              {touched.birthDate && errors.birthDate && (
                <motion.span 
                  className="error-message"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.birthDate}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          
          <div className="form-group">
            <label>Hobbies</label>
            <div 
              className={`hobbies-container ${touched.hobbies && errors.hobbies ? 'error' : ''}`}
              onBlur={() => handleBlur('hobbies')}
            >
              <div className="hobby-option">
                <input 
                  type="checkbox" 
                  id="drawing" 
                  name="hobbies" 
                  value="Drawing"
                  checked={formData.hobbies.includes('Drawing')}
                  onChange={handleHobbyChange}
                />
                <label htmlFor="drawing">Drawing</label>
              </div>
              
              <div className="hobby-option">
                <input 
                  type="checkbox" 
                  id="singing" 
                  name="hobbies" 
                  value="Singing"
                  checked={formData.hobbies.includes('Singing')}
                  onChange={handleHobbyChange}
                />
                <label htmlFor="singing">Singing</label>
              </div>
              
              <div className="hobby-option">
                <input 
                  type="checkbox" 
                  id="dancing" 
                  name="hobbies" 
                  value="Dancing"
                  checked={formData.hobbies.includes('Dancing')}
                  onChange={handleHobbyChange}
                />
                <label htmlFor="dancing">Dancing</label>
              </div>
              
              <div className="hobby-option">
                <input 
                  type="checkbox" 
                  id="other" 
                  name="hobbies" 
                  value="Other"
                  checked={formData.hobbies.includes('Other')}
                  onChange={handleHobbyChange}
                />
                <label htmlFor="other">Other</label>
                
                {formData.hobbies.includes('Other') && (
                  <motion.input
                    type="text"
                    name="otherHobby"
                    value={formData.otherHobby}
                    onChange={handleChange}
                    placeholder="Specify other hobby"
                    className="other-hobby"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            </div>
            <AnimatePresence>
              {touched.hobbies && errors.hobbies && (
                <motion.span 
                  className="error-message"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.hobbies}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <motion.div
              className={`input-container ${touched.email && errors.email ? 'error' : ''}`}
              whileTap={{ scale: 0.98 }}
            >
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                placeholder="Enter your email address"
              />
            </motion.div>
            <AnimatePresence>
              {touched.email && errors.email && (
                <motion.span 
                  className="error-message"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.email}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          
          <div className="form-group">
            <label htmlFor="note">Note</label>
            <motion.div
              className={`input-container ${touched.note && errors.note ? 'error' : ''}`}
              whileTap={{ scale: 0.99 }}
            >
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                onBlur={() => handleBlur('note')}
                placeholder="Add any additional information"
                rows={4}
              ></textarea>
            </motion.div>
            <AnimatePresence>
              {touched.note && errors.note && (
                <motion.span 
                  className="error-message"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {errors.note}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          
          <motion.button 
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default FormValidator;
