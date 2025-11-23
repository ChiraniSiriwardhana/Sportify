// utils/validations.ts
import * as Yup from 'yup';

// ============ Login Validation Schema ============
export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .required('Password is required'),
});

// ============ Register Validation Schema ============
export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    )
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

// ============ Form Validation Helper ============
export const validateForm = async (
  schema: Yup.ObjectSchema<any>,
  values: any
): Promise<{ isValid: boolean; errors?: any }> => {
  try {
    await schema.validate(values, { abortEarly: false });
    return { isValid: true };
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      const errors: any = {};
      err.inner.forEach((error) => {
        if (error.path) {
          errors[error.path] = error.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false };
  }
};

export default {
  loginSchema,
  registerSchema,
  validateForm,
};