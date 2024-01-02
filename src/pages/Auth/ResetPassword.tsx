// Formik import
import { Formik, Field, Form, ErrorMessage } from 'formik';

// Yup Import
import * as Yup from 'yup';

// React-router-dom routing import
import { useNavigate } from 'react-router-dom';

// Login page route import
import { loginPage } from '../../routes';

// Firebase imports
import {
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { auth } from '../../main';

// User authentication message modal import
import AuthenticationModal from '../../components/AuthenticationModal';

// React state hook
import { useState } from 'react';

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
  // State variables and functions
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Open modal function. Changes the state of the modal display to true
  const openModal = () => {
    setShowModal(true);
  };

  // Reset password form handler
  const handlePasswordReset = async (values: FormValues) => {
    try {
      // Extract the email from the form email value
      const { email } = values;

      // >>>>>>>>>> BELOW EMAIL CHECK IS NOT FUNCTIONING - IT KEEPS ON RETURNING AN EMPTY ARRAY EVEN IF THE EMAIL EXISTS <<<<<<<<<<

      // Check if the email exists before sending the reset email
      const checkIfEmailExists = await fetchSignInMethodsForEmail(auth, email);
      console.log(checkIfEmailExists);
      console.log(email);
      if (!checkIfEmailExists.length) {
        // throw new Error("User not found");
      }
      // Firebase send email password link built-in function
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset success');
      // Callback: Opens sign-up modal component with success message
      setSuccessMessage(
        'Success! A password reset link has been sent to your email address. Check your inbox and follow the instructions to create a new password.'
      );
      // Clear previous error messages for success message
      setErrorMessage('');
      // Callback: Opens sign-up modal component with success message
      openModal();
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setSuccessMessage('');
      }
      // Callback: Opens sign-up modal component with success message
      openModal();
    }
  };
  // React-router-dom routing
  const navigate = useNavigate();

  return (
    <>
      {/* Page title */}
      <h1 className='mt-5 text-center'>Reset Password</h1>
      {/* // Formik opening tag including the state of the form input fields, the form handle submit function, and the Yup validation schema */}
      <Formik
        initialValues={initialValues}
        onSubmit={handlePasswordReset}
        validationSchema={validationSchema}
      >
        <div className='row justify-content-center'>
          <div className='col-12 col-md-8 col-lg-6' style={{ width: '35rem' }}>
            {/* Reset email form */}
            <Form>
              <h4>Enter your email address below:</h4>
              {/* Email user input */}
              <Field
                className='form-control'
                name='email'
                type='email'
                id='email'
                placeholder='Enter email address'
              />
              {/* Formik/Yup validation error message */}
              <p className='validation-error-message'>
                <ErrorMessage name='email' />
              </p>
              {/* Form button group */}
              <div className='d-grid gap-2 col-sm-12 col-md-11 col-lg-11 col-xxl-11 mx-auto text-center'>
                <button type='submit' className='btn btn-primary mb-4'>
                  Reset Password
                </button>
                <button
                  className='btn btn-secondary'
                  onClick={() => navigate(loginPage)}
                >
                  Login
                </button>
              </div>
            </Form>
          </div>
          {/* AuthenticationModal - managing visibility using shorthand conditional rendering */}
          {showModal && (
            // Ternary operator used to conditionally render the correct error/success messages for the user
            <AuthenticationModal
              modalTitle={
                errorMessage
                  ? 'Password Reset Failed'
                  : 'Password Reset Link Successfully Sent'
              }
              signUpValidationMessage={
                errorMessage ? errorMessage : successMessage
              }
              closeModal={() => setShowModal(false)}
              redirectLink={'Login'}
            />
          )}
        </div>
      </Formik>
    </>
  );
};

export default ResetPassword;
