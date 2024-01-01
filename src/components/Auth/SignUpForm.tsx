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

// Define the shape and validation of the form values
interface FormValues {
  /* FormValues is a custom type created to define the structure of an object representing form values. See doc below on representing data through an interface:
https://www.typescriptlang.org/docs/handbook/2/objects.html */
  firstName: string;
  surname: string;
  email: string;
  password: string;
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

  // Form Submit Handler
  const handleSubmit = async (values: FormValues, { resetForm }) => {
    /* (try...catch Promise method)
   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch */
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
      // Triggers success modal
      setSuccessMessage('Your account has been successfully created.');
      // Clear previous error messages for success message
      setErrorMessage('');
      // Reset form (built-in Formik function)
      resetForm();
      // Callback: Opens sign-up modal component with success message
      openModal();
      // GPT fix: using the unknown type to typescript unknown variable error.
    } catch (error: unknown) {
      // Handle errors
      console.error('Error creating user: ', error);
      // Part of the GPT typescript error fix. Using the instance of operator:
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
      if (error instanceof Error) {
        // Show the specific error message from Firebase
        setErrorMessage(error.message);
      } else {
        // Fallback message for non-Error types
        setErrorMessage('An unknown error occurred. Please try again');
      }
      // Callback: Opens sign-up modal component with failure message
      openModal();
    }
  };

  return (
    // Formik opening tag including the state of the form input fields, the form handle submit function, and the Yup validation schema
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <div className='container mt-5'>
        <div className='row justify-content-center'>
          <div className='col-12 col-md-8 col-lg-6' style={{ width: '35rem' }}>
            <div className='card'>
              {/* Form Title */}
              <h2 className='text-center mt-5'>{props.formTitle}</h2>
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
                      <p className='validation-error-message'>
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
                      <p className='validation-error-message'>
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
                    {/* Password requirements text */}
                    <p className='password-requirements-text'>
                      <small>
                        Password must be at least 8 characters long and include
                        uppercase and lowercase letters, a number, and a special
                        character.
                      </small>
                    </p>
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
                  {/* Login page link using navigate react-router-dom hook */}
                  <button
                    className='btn btn-success mb-4'
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
                    closeModal={() => setShowModal(false)}
                    modalTitle={
                      errorMessage ? 'Sign Up Failed' : 'Sign Up Success'
                    }
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

export default SignUpForm;
