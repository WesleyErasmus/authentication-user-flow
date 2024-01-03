// Login form stylesheet
import '../../styles/loginForm.css';

// Formik Import
import { Formik, Field, Form, ErrorMessage } from 'formik';

// Yup Import
import * as Yup from 'yup';

// Firebase Imports
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../main';

// User authentication message modal import
import AuthenticationModal from '../AuthenticationModal';

// React state Hook
import { useState } from 'react';

// Importing useNavigate hook
import { useNavigate } from 'react-router-dom';

// Importing Login page const path
import { resetPassword, signUpPage } from '../../routes';

// Defines the shape and validation of the form values
interface FormValues {
  email: string;
  password: string;
}

// Define the shape of the user error messages keys
interface ErrorMessages {
  'auth/user-not-found': string;
  'auth/user-disabled': string;
  'auth/internal-error': string;
  'auth/network-request-failed': string;
  'auth/invalid-credential': string;

  [key: string]: string;
}

// Initial values for the form
const initialValues: FormValues = {
  /* This variable will store the initial values for a form. It is declared to adhere to the FormValues type structure
   */
  // Define the initial values of the form fields as empty strings
  email: '',
  password: '',
};

// Yup validation schema / Error Messages
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please use a valid email address')
    .required('Email address is required'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Your password requires a number')
    .matches(/[a-z]/, 'Your password requires a lowercase letter')
    .matches(/[A-Z]/, 'Your password requires an uppercase letter')
    .matches(/[^\w]/, 'Your password requires a symbol')
    .required('Password is required'),
});

// Sign-Up Form Object Function
const LoginForm = (props: {
  formTitle: string;
  email: string;
  password: string;
  submitButton: string;
  redirect: string;
}) => {
  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);
  // User Sign-up error message state
  const [errorMessage, setErrorMessage] = useState('');
  // User Sign-up success message
  const [successMessage, setSuccessMessage] = useState('');
  //   Show password state
  const [showPassword, setShowPassword] = useState(false);

  // Hook to get navigation function from useNavigate from react-router-dom
  const navigate = useNavigate();

  // Open modal function. Changes the state of the modal display to true
  const openModal = () => {
    setShowModal(true);
  };

  // Show / Hide password input field
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Error messages displayed to the user
  const errorMessages: ErrorMessages = {
    'auth/user-not-found':
      'The email address you entered is not registered. Please check the email address or create an account.',
    'auth/user-disabled':
      'This account has been disabled. Please contact support for assistance.',
    'auth/internal-error':
      'An internal error occurred. Please try again later.',
    'auth/network-request-failed':
      'Network error occurred. Please check your connection and try again.',
    'auth/invalid-credential':
      'The username or password you entered is incorrect. Please try again.',
  };

  // Function to display the error messages to the user
  const displayUserErrors = (errorCode: string) => {
    return (
      errorMessages[errorCode] ||
      'An unknown error occurred. Please try again later.'
    );
  };

  // Form Submit Handler
  const handleSubmit = async (values: FormValues) => {
    try {
      // Extract the email and password from the form values
      const { email, password } = values;
      // Create a new user in Firebase with the email and password
      const response = await signInWithEmailAndPassword(auth, email, password);
      // Handle successful user creation if the user is created successfully
      console.log('User Successfully Logged In: ', response.user);
      // Sets success message state
      setSuccessMessage(
        'Login Successful!'
      );
      // Clear previous error messages for success message
      setErrorMessage('');
      // Callback: Opens sign-up modal component with success message
      openModal();
    } catch (error: unknown) {
      // Handle errors
      const errorCode = (error as { code: string }).code;
      const errorMessage = displayUserErrors(errorCode);
      setErrorMessage(errorMessage);
      // Callback: Opens sign-up modal component with failure message
      openModal();
      console.error('Error Logging In: ', error);
    }
  };

  return (
    // Formik opening tag including the state of the form input fields, the form handle submit function, and the Yup validation schema
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnBlur={false} // used to prevent show pw from triggering Yup validation
      validateOnChange={false} // used to prevent show pw from triggering Yup validation
    >
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className='col-12 col-md-8 col-lg-6' style={{ width: '35rem' }}>
            <div className='card'>
              {/* Form Title */}
              <h2 className='text-center mt-5'>{props.formTitle}</h2>
              <div className='card-body py-md-4'>
                {/* Login form using Formik */}
                <Form>
                  <div className='col'>
                    {/* Email input */}
                    <Field
                      className='form-control'
                      name='email'
                      type='email'
                      id='email'
                      placeholder={props.email}
                    />
                    {/* Formik/Yup validation error message */}
                    <p className='validation-error-message'>
                      <ErrorMessage name='email' />
                    </p>
                  </div>
                  <div className='col'>
                    {/* Password input */}
                    <Field
                      className='form-control'
                      name='password'
                      type={showPassword ? 'text' : 'password'}
                      id='password'
                      placeholder={props.password}
                    />
                    {/* Formik/Yup validation error message */}
                    <p className='validation-error-message'>
                      <ErrorMessage name='password' />
                    </p>
                    {/* SHOW PASSWORD BUTTON - >>>>>> IN PROGRESS <<<<<<< 
                      - Password validation gets triggered when the show password checkbox is clicked, most likely because the password field has been "touched" - how can this bug be resolved to prevent password validation from being triggered?  
                    */}
                    <label className='show-password-checkbox'>
                      <Field
                        type='checkbox'
                        name='toggle'
                        onClick={togglePasswordVisibility}
                      />{' '}
                      <span>{showPassword ? 'Hide' : 'Show'} Password</span>
                    </label>
                  </div>
                  {/* Form button group */}
                  <div className='d-grid gap-2 col-sm-12 col-md-11 col-lg-11 col-xxl-11 mx-auto text-center'>
                    {/* Create account button */}
                    <button type='submit' className='btn btn-primary mt-4'>
                      {props.submitButton}
                    </button>
                    <span className='span-btn-spacer'>Or</span>
                  </div>
                </Form>
                <div className='d-grid gap-2 col-sm-12 col-md-11 col-lg-11 col-xxl-11 mx-auto text-center mt-2'>
                  {/* Login page link */}
                  <button
                    className='btn btn-success mb-4'
                    onClick={() => navigate(signUpPage)}
                  >
                    {props.redirect}
                  </button>
                  <p onClick={() => navigate(resetPassword)}>
                    {' '}
                    <a href=''> Forgot password? Reset Password</a>
                  </p>
                </div>

                {/* Managing visibility of the modal state using shorthand conditional rendering. This changes the shoModal state from its default false state to true displaying the AuthenticationModal component.  */}
                {showModal && (
                  // Ternary operator used to conditionally render the correct error/success messages for the user
                  <AuthenticationModal
                    signUpValidationMessage={
                      errorMessage ? errorMessage : successMessage
                    }
                    closeModal={() => setShowModal(false)}
                    modalTitle={errorMessage ? 'Login Failed' : 'LoginSuccess'}
                    redirectLink={'Login'}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default LoginForm;
