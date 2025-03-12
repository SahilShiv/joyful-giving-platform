
document.addEventListener('DOMContentLoaded', () => {
  // Get form and elements
  const form = document.getElementById('validationForm');
  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const birthDate = document.getElementById('birthDate');
  const email = document.getElementById('email');
  const note = document.getElementById('note');
  const hobbiesContainer = document.getElementById('hobbiesContainer');
  const otherCheckbox = document.getElementById('other');
  const otherHobbyContainer = document.getElementById('otherHobbyContainer');
  const otherHobby = document.getElementById('otherHobby');
  const responseMessage = document.getElementById('responseMessage');
  
  // Set max date to today
  const today = new Date().toISOString().split('T')[0];
  birthDate.setAttribute('max', today);
  
  // Show/hide other hobby input when "Other" is checked/unchecked
  otherCheckbox.addEventListener('change', () => {
    otherHobbyContainer.style.display = otherCheckbox.checked ? 'block' : 'none';
    if (!otherCheckbox.checked) {
      otherHobby.value = '';
    }
  });
  
  // Add event listeners for real-time validation
  const inputs = [firstName, lastName, birthDate, email, note];
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });
    
    input.addEventListener('input', () => {
      // Clear error when user starts typing
      if (input.value.trim() !== '') {
        const errorElement = document.getElementById(`${input.id}Error`);
        errorElement.textContent = '';
        input.parentElement.classList.remove('error');
      }
    });
  });
  
  // Validate hobbies when any checkbox is clicked
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      validateHobbies();
    });
  });
  
  // Form submission handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    
    if (!validateHobbies()) {
      isValid = false;
    }
    
    // If form is valid, submit
    if (isValid) {
      // Collect form data
      const formData = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        birthDate: birthDate.value,
        hobbies: Array.from(checkboxes)
          .filter(checkbox => checkbox.checked)
          .map(checkbox => checkbox.value),
        otherHobby: otherHobby.value.trim(),
        email: email.value.trim(),
        note: note.value.trim()
      };
      
      // Simulating form submission with a timeout
      responseMessage.textContent = 'Processing...';
      responseMessage.className = 'response-message';
      responseMessage.style.display = 'block';
      
      setTimeout(() => {
        console.log('Form submitted:', formData);
        
        // Show success message
        responseMessage.textContent = 'Form submitted successfully!';
        responseMessage.className = 'response-message success';
        
        // Reset form
        form.reset();
        otherHobbyContainer.style.display = 'none';
        
        // Reset all error states
        document.querySelectorAll('.input-container').forEach(container => {
          container.classList.remove('error');
        });
        hobbiesContainer.classList.remove('error');
        
        document.querySelectorAll('.error-message').forEach(errorMsg => {
          errorMsg.textContent = '';
        });
        
        // Scroll to the success message
        responseMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1500);
    } else {
      // Shake the form to indicate errors
      form.classList.add('shake');
      setTimeout(() => {
        form.classList.remove('shake');
      }, 400);
      
      // Scroll to the first error
      const firstError = document.querySelector('.error-message:not(:empty)');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
  
  // Validation functions
  function validateField(input) {
    const errorElement = document.getElementById(`${input.id}Error`);
    let isValid = true;
    
    switch (input.id) {
      case 'firstName':
        if (input.value.trim() === '') {
          errorElement.textContent = 'First name is required';
          input.parentElement.classList.add('error');
          isValid = false;
        } else {
          errorElement.textContent = '';
          input.parentElement.classList.remove('error');
        }
        break;
        
      case 'lastName':
        if (input.value.trim() === '') {
          errorElement.textContent = 'Last name is required';
          input.parentElement.classList.add('error');
          isValid = false;
        } else {
          errorElement.textContent = '';
          input.parentElement.classList.remove('error');
        }
        break;
        
      case 'birthDate':
        if (input.value === '') {
          errorElement.textContent = 'Birth date is required';
          input.parentElement.classList.add('error');
          isValid = false;
        } else {
          errorElement.textContent = '';
          input.parentElement.classList.remove('error');
        }
        break;
        
      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (input.value.trim() === '') {
          errorElement.textContent = 'Email is required';
          input.parentElement.classList.add('error');
          isValid = false;
        } else if (!emailPattern.test(input.value.trim())) {
          errorElement.textContent = 'Please enter a valid email address';
          input.parentElement.classList.add('error');
          isValid = false;
        } else {
          errorElement.textContent = '';
          input.parentElement.classList.remove('error');
        }
        break;
        
      case 'note':
        if (input.value.trim() === '') {
          errorElement.textContent = 'Note is required';
          input.parentElement.classList.add('error');
          isValid = false;
        } else {
          errorElement.textContent = '';
          input.parentElement.classList.remove('error');
        }
        break;
    }
    
    return isValid;
  }
  
  function validateHobbies() {
    const errorElement = document.getElementById('hobbiesError');
    const checkboxes = document.querySelectorAll('input[name="hobbies"]:checked');
    
    if (checkboxes.length === 0) {
      errorElement.textContent = 'Select at least one hobby';
      hobbiesContainer.classList.add('error');
      return false;
    } else {
      // Check if "Other" is selected but no value is provided
      if (otherCheckbox.checked && otherHobby.value.trim() === '') {
        errorElement.textContent = 'Please specify your other hobby';
        hobbiesContainer.classList.add('error');
        return false;
      } else {
        errorElement.textContent = '';
        hobbiesContainer.classList.remove('error');
        return true;
      }
    }
  }
});
