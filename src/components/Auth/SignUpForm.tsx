// Sign-up form stylesheet import
import '../../styles/signUpForm.css';

// Formik Import
import { Formik, Field, Form, ErrorMessage } from 'formik';

// Yup Import
import * as Yup from 'yup';

// Firebase Imports
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../main';

// User authentication message modal import
import AuthenticationModal from '../AuthenticationModal';

// React state Hook
import { useState } from 'react';

// Importing useNavigate hook
import { useNavigate } from 'react-router-dom';

// Importing Login page const path
import { loginPage } from '../../routes';

// Logo import
import logo from '../../assets/form_AUF-logos_transparent.png';

// Import spinner
import LoadingSpinner from '../LoadingSpinner';

// Define the shape and validation of the form values
interface FormValues {
  /* FormValues is a custom type created to define the structure of an object representing form values. See doc below on representing data through an interface:
https://www.typescriptlang.org/docs/handbook/2/objects.html */
  firstName: string;
  surname: string;
  email: string;
  password: string;
}
// Define the shape of the user error messages keys
interface ErrorMessages {
  'auth/email-already-in-use': string;
  'auth/internal-error': string;
  'auth/network-request-failed': string;
  'auth/invalid-email': string;

  [key: string]: string;
}

// Initial values for the form
const initialValues: FormValues = {
  /* This variable will store the initial values for a form. It is declared to adhere to the FormValues type structure  */
  firstName: '',
  surname: '',
  email: '',
  password: '',
};

// Yup validation schema / Error Messages
const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(
      20,
      'You have exceeded the maximum number of characters. Please use 20 characters or less.'
    )
    .required('First name is required'),
  surname: Yup.string()
    .max(
      30,
      'You have exceeded the maximum number of characters. Please use 30 characters or less.'
    )
    .required('Surname is required'),
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
const SignUpForm = (props: {
  formTitle: string;
  firstName: string;
  surname: string;
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
  // Show password state
  const [showPassword, setShowPassword] = useState(false);
  // Loading spinner state
  const [isLoading, setIsLoading] = useState(false);

  // Hook to get navigation function from useNavigate from react-router-dom
  const navigate = useNavigate();

  // Open modal function. Changes the state of the modal display to true
  const openModal = () => {
    setShowModal(true);
  };

  const successRedirect = () => {
    navigate(loginPage);
  }

  // Show / Hide password input field
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Error messages displayed to the user
  const errorMessages: ErrorMessages = {
    'auth/email-already-in-use':
      'This email address is already in use. Please log in or try with a different email.',
    'auth/internal-error':
      'An internal error occurred. Please try again later.',
    'auth/network-request-failed':
      'Network error occurred. Please check your connection and try again.',
    'auth/invalid-email': 'Please enter a valid email address',
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
    // Trigger loading spinner
    setIsLoading(true);
    try {
      // Extract the email and password from the form values
      const { email, password } = values;
      // Create a new user in Firebase with the email and password
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Handle successful user creation if the user is created successfully
      console.log('User Successfully created: ', response.user);
      // Sets success message state
      setSuccessMessage('Account created successfully!');
      // Stop loading spinner
      setIsLoading(false);
      // Clear previous error messages for success message
      setErrorMessage('');
      // Callback: Opens modal component with success message
      openModal();
      // Handle errors
    } catch (error: unknown) {
      const errorCode = (error as { code: string }).code;
      // Stop loading spinner
      setIsLoading(false);
      const errorMessage = displayUserErrors(errorCode);
      setErrorMessage(errorMessage);
      // Callback: Opens modal component with failure message
      openModal();
      console.error('Error creating user: ', error);
    }
  };

  return (
    // Page wrapper
    <div className='sign-up-page-wrapper app-bg'>
      {/* Formik opening tag including the state of the form input fields, the
      form handle submit function, and the Yup validation schema */}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        // used to prevent show pw from triggering Yup validation
        validateOnBlur={false}
        // used to prevent show pw from triggering Yup validation
        validateOnChange={false}
      >
        {/* Sign-up form container */}
        <div className='container sign-up-form-container'>
          <div className='row justify-content-center'>
            {/* Form width and responsive grid classes */}
            <div
              className='col-12 col-md-8 col-lg-6'
              style={{ width: '35rem' }}
            >
              {/* Form card */}
              <div className='sign-up-form-card card pt-3'>
                {/* Form logo */}
                <div className='sign-up-form-logo-container mx-auto'>
                  {/* Logo image */}
                  <img src={logo} alt='Logo' className='img-fluid' />
                </div>
                <div className='mx-auto text-center'>
                  {/* Form Title */}
                  <h3 className='app-headings-global text-center text-black'>
                    {/* Title icon */}
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='45'
                      height='45'
                      fill='currentColor'
                      className='bi bi-person-add text-secondary'
                      viewBox='0 0 16 16'
                    >
                      <path d='M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4' />
                      <path d='M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z' />
                    </svg>{' '}
                    {/* Title prop */}
                    {props.formTitle}
                  </h3>
                </div>
                {/* Card body */}
                <div className='card-body py-md-4'>
                  {/* Sign-Up form using Formik */}
                  <Form>
                    {/* First name / Surname row container */}
                    <div className='row g-3'>
                      <div className='col'>
                        {/* First name input */}
                        <Field
                          className='form-control'
                          name='firstName'
                          type='text'
                          id='firstName'
                          placeholder={props.firstName}
                        />
                        {/* Formik/Yup validation error message */}
                        <p className='app-form-validation-error-message'>
                          <ErrorMessage name='firstName' />
                        </p>
                      </div>
                      <div className='col'>
                        {/* Surname input */}
                        <Field
                          className='form-control'
                          name='surname'
                          type='text'
                          id='surname'
                          placeholder={props.surname}
                        />
                        {/* Formik/Yup validation error message */}
                        <p className='app-form-validation-error-message'>
                          <ErrorMessage name='surname' />
                        </p>
                      </div>
                    </div>
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
                      <p className='app-form-validation-error-message'>
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
                      <p className='app-form-validation-error-message'>
                        <ErrorMessage name='password' />
                      </p>
                      {/* Show password checkbox */}
                      <label className='px-1'>
                        <Field
                          type='checkbox'
                          name='toggle'
                          onClick={togglePasswordVisibility}
                        />{' '}
                        <span>{showPassword ? 'Hide' : 'Show'} Password</span>
                      </label>
                      {/* Password requirements text */}
                      <p className='px-2 mt-2'>
                        <small>
                          Password must be at least 8 characters long and
                          include uppercase and lowercase letters, a number, and
                          a special character.
                        </small>
                      </p>
                    </div>
                    {/* Form button group */}
                    <div className='d-grid gap-2 col-sm-12 col-md-11 col-lg-11 col-xxl-11 mx-auto text-center'>
                      {/* Create account button */}
                      <button type='submit' className='btn btn-primary mt-4'>
                        {props.submitButton}
                      </button>
                      {/* Text between buttons */}
                      <span>Or</span>
                    </div>
                  </Form>
                  <div className='d-grid gap-2 col-sm-12 col-md-11 col-lg-11 col-xxl-11 mx-auto text-center mt-2'>
                    {/* Login button - using react navigate hook from react-router-dom package */}
                    <button
                      className='btn btn-secondary mb-4'
                      onClick={() => navigate(loginPage)}
                    >
                      {props.redirect}
                    </button>
                  </div>
                  {/* Managing visibility of the modal state using shorthand conditional rendering. This changes the shoModal state from its default false state to true displaying the signUpModal component.  */}
                  {showModal && (
                    // Ternary operator used to conditionally render the correct error/success messages for the user
                    <AuthenticationModal
                      signUpValidationMessage={
                        errorMessage ? errorMessage : successMessage
                      }
                      closeModal={errorMessage ? () => setShowModal(false) : successRedirect}
                      modalTitle={
                        errorMessage ? 'Sign Up Failed' : 'Sign Up Success'
                      }
                      modalTheme={errorMessage ? false : true}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Formik>

      {/* Display Spinner when loading */}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default SignUpForm;
