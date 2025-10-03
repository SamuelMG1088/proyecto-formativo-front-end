// Centralized validation utility for the project
export const validationRules = {
  // Email validation
  email: {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    minLength: 5,
    maxLength: 100,
    message: {
      required: 'El email es requerido',
      invalid: 'El formato del email no es válido',
      tooShort: 'El email debe tener al menos 5 caracteres',
      tooLong: 'El email no puede exceder 100 caracteres',
      exists: 'Este email ya está registrado'
    }
  },

  // Phone validation
  phone: {
    required: true,
    pattern: /^(\+?[1-9]\d{0,2})?[0-9]{7,15}$/,
    minLength: 7,
    maxLength: 15,
    message: {
      required: 'El teléfono es requerido',
      invalid: 'El formato del teléfono no es válido (7-15 dígitos)',
      tooShort: 'El teléfono debe tener al menos 7 dígitos',
      tooLong: 'El teléfono no puede exceder 15 dígitos'
    }
  },

  // Password validation
  password: {
    required: true,
    minLength: 8,
    maxLength: 50,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    message: {
      required: 'La contraseña es requerida',
      tooShort: 'La contraseña debe tener al menos 8 caracteres',
      tooLong: 'La contraseña no puede exceder 50 caracteres',
      weak: 'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial',
      common: 'Esta contraseña es muy común, elige una más segura',
      personalInfo: 'La contraseña no debe contener información personal'
    }
  },

  // Name validation
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
    message: {
      required: 'El nombre es requerido',
      tooShort: 'El nombre debe tener al menos 2 caracteres',
      tooLong: 'El nombre no puede exceder 50 caracteres',
      invalid: 'El nombre solo puede contener letras y espacios',
      tooManyWords: 'El nombre no puede tener más de 3 palabras',
      noRepeated: 'No se permiten caracteres repetidos consecutivos'
    }
  },

  // Document validation
  document: {
    required: true,
    message: {
      required: 'El número de documento es requerido',
      invalid: 'El formato del documento no es válido',
      exists: 'Este documento ya está registrado'
    }
  },

  // Address validation
  address: {
    required: true,
    minLength: 5,
    maxLength: 200,
    pattern: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s#\-.,]+$/,
    message: {
      required: 'La dirección es requerida',
      tooShort: 'La dirección debe tener al menos 10 caracteres',
      tooLong: 'La dirección no puede exceder 200 caracteres',
      invalid: 'La dirección contiene caracteres no válidos'
    }
  },

  // Program code validation
  programCode: {
    required: true,
    pattern: /^\d+$/,
    minValue: 1,
    message: {
      required: 'El código del programa es requerido',
      invalid: 'El código debe contener solo números',
      tooSmall: 'El código debe ser mayor a 0'
    }
  },

  // Program name validation
  programName: {
    required: true,
    minLength: 3,
    maxLength: 100,
    message: {
      required: 'El nombre del programa es requerido',
      tooShort: 'El nombre debe tener al menos 3 caracteres',
      tooLong: 'El nombre no puede exceder 100 caracteres'
    }
  },

  // Duration validation
  duration: {
    required: true,
    pattern: /^\d+$/,
    minValue: 1,
    maxValue: 10000,
    message: {
      required: 'La duración es requerida',
      invalid: 'La duración debe contener solo números',
      tooSmall: 'La duración debe ser mayor a 0',
      tooLarge: 'La duración no puede exceder 10000 horas'
    }
  }
};

// Validation functions
export const validateField = (fieldName, value, options = {}) => {
  const rule = validationRules[fieldName];
  if (!rule) return { isValid: true, error: '' };

  // Check if field is required and empty
  if (rule.required && (!value || value.trim() === '')) {
    return { isValid: false, error: rule.message.required };
  }

  // Skip validation if field is empty and not required
  if (!rule.required && (!value || value.trim() === '')) {
    return { isValid: true, error: '' };
  }

  const trimmedValue = value.trim();

  // Check minimum length
  if (rule.minLength && trimmedValue.length < rule.minLength) {
    return { isValid: false, error: rule.message.tooShort || rule.message.invalid };
  }

  // Check maximum length
  if (rule.maxLength && trimmedValue.length > rule.maxLength) {
    return { isValid: false, error: rule.message.tooLong || rule.message.invalid };
  }

  // Check pattern
  if (rule.pattern && !rule.pattern.test(trimmedValue)) {
    return { isValid: false, error: rule.message.invalid };
  }

  // Check minimum value for numbers
  if (rule.minValue !== undefined) {
    const numValue = parseInt(trimmedValue);
    if (isNaN(numValue) || numValue < rule.minValue) {
      return { isValid: false, error: rule.message.tooSmall || rule.message.invalid };
    }
  }

  // Check maximum value for numbers
  if (rule.maxValue !== undefined) {
    const numValue = parseInt(trimmedValue);
    if (isNaN(numValue) || numValue > rule.maxValue) {
      return { isValid: false, error: rule.message.tooLarge || rule.message.invalid };
    }
  }

  return { isValid: true, error: '' };
};

// Specific validation functions
export const validateEmail = (email) => {
  return validateField('email', email);
};

export const validatePhone = (phone) => {
  // Clean phone number
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
  return validateField('phone', cleanPhone);
};

export const validatePassword = (password, userData = {}) => {
  const basicValidation = validateField('password', password);
  if (!basicValidation.isValid) return basicValidation;

  // Additional password validations
  if (password.length < 8) {
    return { isValid: false, error: 'La contraseña debe tener al menos 8 caracteres' };
  }

  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, error: 'La contraseña debe contener al menos una letra minúscula' };
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, error: 'La contraseña debe contener al menos una letra mayúscula' };
  }

  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, error: 'La contraseña debe contener al menos un número' };
  }

  if (!/(?=.*[@$!%*?&])/.test(password)) {
    return { isValid: false, error: 'La contraseña debe contener al menos un carácter especial (@$!%*?&)' };
  }

  // Check for repeated characters
  if (/(.)\1{2,}/.test(password)) {
    return { isValid: false, error: 'La contraseña no puede tener caracteres repetidos consecutivos' };
  }

  // Check for personal information
  if (userData.firstName && password.toLowerCase().includes(userData.firstName.toLowerCase())) {
    return { isValid: false, error: 'La contraseña no debe contener el nombre' };
  }

  if (userData.lastName && password.toLowerCase().includes(userData.lastName.toLowerCase())) {
    return { isValid: false, error: 'La contraseña no debe contener el apellido' };
  }

  if (userData.email && password.toLowerCase().includes(userData.email.split('@')[0].toLowerCase())) {
    return { isValid: false, error: 'La contraseña no debe contener el email' };
  }

  // Check for common passwords
  const commonPasswords = ['password', '123456', '123456789', 'qwerty', 'abc123', 'password123', 'admin', 'letmein', 'welcome', 'login', 'master', 'hello'];
  if (commonPasswords.includes(password.toLowerCase())) {
    return { isValid: false, error: 'Esta contraseña es muy común, elige una más segura' };
  }

  return { isValid: true, error: '' };
};

export const validateName = (name) => {
  const basicValidation = validateField('name', name);
  if (!basicValidation.isValid) return basicValidation;

  // Additional name validations
  if (name.trim().split(/\s+/).length > 3) {
    return { isValid: false, error: 'El nombre no puede tener más de 3 palabras' };
  }

  if (/(.)\1{2,}/.test(name)) {
    return { isValid: false, error: 'No se permiten caracteres repetidos consecutivos' };
  }

  if (name.trim().length !== name.length) {
    return { isValid: false, error: 'No se permiten espacios al inicio o final' };
  }

  return { isValid: true, error: '' };
};

export const validateDocument = (documentNumber, documentType) => {
  if (!documentNumber || documentNumber.trim() === '') {
    return { isValid: false, error: 'El número de documento es requerido' };
  }

  if (!/^\d+$/.test(documentNumber)) {
    return { isValid: false, error: 'El documento debe contener solo números' };
  }

  // Specific validations based on document type
  switch (documentType) {
    case 'C.C':
      if (documentNumber.length < 6 || documentNumber.length > 10) {
        return { isValid: false, error: 'La cédula debe tener entre 6 y 10 dígitos' };
      }
      // Add Colombian cedula validation algorithm if needed
      break;
    case 'NIT':
      if (documentNumber.length < 9 || documentNumber.length > 15) {
        return { isValid: false, error: 'El NIT debe tener entre 9 y 15 dígitos' };
      }
      // Add Colombian NIT validation algorithm if needed
      break;
    case 'C.E':
      if (documentNumber.length < 6 || documentNumber.length > 15) {
        return { isValid: false, error: 'La cédula de extranjería debe tener entre 6 y 15 dígitos' };
      }
      break;
    default:
      break;
  }

  return { isValid: true, error: '' };
};

export const validateAddress = (address) => {
  const basicValidation = validateField('address', address);
  if (!basicValidation.isValid) return basicValidation;

  // Simple validation: just check that it has at least 3 letters
  const letterCount = (address.match(/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/g) || []).length;
  
  if (letterCount < 3) {
    return { isValid: false, error: 'La dirección debe tener al menos 3 letras' };
  }

  return { isValid: true, error: '' };
};

// Form validation helper
export const validateForm = (formData, fieldsToValidate) => {
  const errors = {};
  let isValid = true;

  fieldsToValidate.forEach(field => {
    const validation = validateField(field, formData[field]);
    if (!validation.isValid) {
      errors[field] = validation.error;
      isValid = false;
    }
  });

  return { isValid, errors };
};

// Real-time validation hook
export const useValidation = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (field, value) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Validate in real-time if field has been touched
    if (touched[field]) {
      const validation = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: validation.error }));
    }
  };

  const handleBlur = (field, value) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const validation = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: validation.error }));
  };

  const validateAll = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(values).forEach(field => {
      const validation = validateField(field, values[field]);
      if (!validation.isValid) {
        newErrors[field] = validation.error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return isValid;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    setValues,
    setErrors,
    setTouched
  };
};

// Import React for the hook
import { useState } from 'react';
