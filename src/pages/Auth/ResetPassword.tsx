// Stylesheet import
import '../../styles/resetPassword.css';

// Formik import
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';

// Yup Import
import * as Yup from 'yup';

// React-router-dom routing import
import { useNavigate } from 'react-router-dom';

// Login page route import
import { loginPage } from '../../routes';

// Firebase imports
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../main';

// User authentication message modal import
import AuthenticationModal from '../../components/AuthenticationModal';

// React state hook
import { useState } from 'react';

// Import loading spinner
import LoadingSpinner from '../../components/LoadingSpinner';

// Define the shape of the user error messages keys
interface ErrorMessages {
  'auth/invalid-email': string;
  'auth/internal-error': string;
  'auth/network-request-failed': string;
}

// Defines the shape and validation of the form email input value
interface FormValues {
  email: string;
}

//Stores the initial email value for a reset password form input
const initialValues: FormValues = {
  email: '',
};

// Yup validation schema / Error Messages
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email address is required.'),
});

// Reset Password Form Object Function
const ResetPassword = () => {
  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);
  // User error message state
  const [errorMessage, setErrorMessage] = useState('');
  // User success message state
  const [successMessage, setSuccessMessage] = useState('');
  // Loading spinner state
  const [isLoading, setIsLoading] = useState(false);

  // Open modal function. Changes the state of the modal display to true
  const openModal = () => {
    setShowModal(true);
  };

  // Error messages displayed to the user
  const errorMessages: ErrorMessages = {
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
      'An unknown error has occurred. Please try again later.'
    );
  };

  // Reset password form handler
  const handlePasswordReset = async (
    values: FormValues,
    //FormikHelpers<FormValues> provides TypeScript with the correct type information for the resetForm function
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    // Trigger loading spinner
    setIsLoading(true);
    try {
      // Extract the email from the form email value
      const { email } = values;

      // Firebase send email password link built-in function
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset success');
      // Sets success message state
      setSuccessMessage(
        'A password reset link has been sent to your email address. Please check your inbox and follow the instructions to create a new password.'
      );
      // Clear previous error messages for success message
      setErrorMessage('');
      // Reset form after successful submit for improved flow
      resetForm();
      // Stop loading spinner
      setIsLoading(false);
      // Callback: Opens sign-up modal component with success message
      openModal();
      // Handles errors
    } catch (error: unknown) {
      const errorCode = (error as {code: string}).code;
      // Stop loading error
      setIsLoading(false);
      const errorMessage = displayUserErrors(errorCode);
      setErrorMessage(errorMessage);
      // Callback: Opens modal component with failure message
      openModal();
      console.error('Error sending email link', error);
    }
  };
  // React-router-dom routing
  const navigate = useNavigate();

  return (
    <>
      {/* Page wrapper */}
      <div className='reset-password-page-wrapper app-bg'>
        {/* Reset password form container */}
        <div className='container reset-password-container'>
          <div className='row justify-content-center'>
            {/* Form width and responsive grid classes */}
            <div
              className='col-12 col-md-8 col-lg-6'
              style={{ width: '35rem' }}
            >
              {/* Form card */}
              <div className='reset-password-card card'>
                <div className='card-body'>
                  <div className='mx-auto text-center'>
                    {/* Form icon */}
                    <i className='reset-password-icon text-secondary bi bi-shield-lock'></i>
                    {/* Form title */}
                    <h3 className='app-headings-global text-primary mb-4'>
                      Reset Your Password
                    </h3>
                  </div>
                  {/* // Formik opening tag including the state of the form input fields, the form handle submit function, password reset, and the Yup validation schema */}
                  <Formik
                    initialValues={initialValues}
                    onSubmit={handlePasswordReset}
                    validationSchema={validationSchema}
                  >
                    <div className='row justify-content-center'>
                      <div>
                        {/* Reset email form */}
                        <Form>
                          <div className='mb-4'>
                            <p className='reset-card-text mb-4 px-1'>
                              Enter the email address associated with your
                              account to receive a password reset link.
                            </p>
                            {/* Email user input */}
                            <Field
                              className='form-control'
                              name='email'
                              type='email'
                              id='email'
                              placeholder='Enter your email address here'
                            />

                            {/* Formik/Yup validation error message */}
                            <p className='app-form-validation-error-message'>
                              <ErrorMessage name='email' />
                            </p>
                          </div>
                          {/* Form button group */}
                          <div className='d-grid gap-2 px-1 pt-3'>
                            {/* Send email button */}
                            <button
                              type='submit'
                              className='send-email-btn btn btn-primary mb-4'
                            >
                              {/* Send email button icon */}
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='20'
                                height='20'
                                fill='currentColor'
                                className='bi bi-envelope-arrow-up'
                                viewBox='0 0 16 16'
                              >
                                <path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4.5a.5.5 0 0 1-1 0V5.383l-7 4.2-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h5.5a.5.5 0 0 1 0 1H2a2 2 0 0 1-2-1.99zm1 7.105 4.708-2.897L1 5.383zM1 4v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1'></path>
                                <path d='M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.354 1.25 1.25a.5.5 0 0 1-.708.708L13 12.207V14a.5.5 0 0 1-1 0v-1.717l-.28.305a.5.5 0 0 1-.737-.676l1.149-1.25a.5.5 0 0 1 .722-.016'></path>
                              </svg>
                              Send Email
                            </button>
                            {/* Back button using react-router-dom navigate hook */}
                            <button
                              className='btn btn-secondary mb-4'
                              onClick={() => navigate(loginPage)}
                            >
                              Back
                            </button>
                          </div>
                        </Form>
                      </div>
                      {/* AuthenticationModal - managing visibility using shorthand conditional rendering */}
                      {showModal && (
                        // Ternary operator used to conditionally render the correct error/success messages for the user
                        <AuthenticationModal
                          modalTitle={
                            errorMessage ? 'Password Reset Failed' : 'Success!'
                          }
                          signUpValidationMessage={
                            errorMessage ? errorMessage : successMessage
                          }
                          closeModal={() => setShowModal(false)}
                          redirectLink={'Login'}
                          modalTheme={errorMessage ? false : true}
                        />
                      )}
                    </div>
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isLoading && <LoadingSpinner />}
      </div>
    </>
  );
};

export default ResetPassword;
