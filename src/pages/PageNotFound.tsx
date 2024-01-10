// Import styles
import '../styles/pageNotFound.css';

// import navigate hook from react router dom
import { useNavigate } from 'react-router-dom';

// Import sign-up page route
import { signUpPage } from '../routes';

const PageNotFound = () => {
  // React navigate hook assigned to a variable
  const navigate = useNavigate();
  return (
    <>
      {/* Page wrapper */}
      <div className='page-not-found-wrapper text-center p-4'>
        {/* Warning icon */}
        <i className='bi bi-exclamation-triangle redirect-icon text-warning'></i>
        {/* Page heading */}
        <h1>Page Not Found: 404</h1>
        {/* Page text */}
        <p className='text-secondary'>
          Oops, page not found. Please click the home button to be redirected to
          the Home Page.
        </p>
        {/* Home button to redirect user to the sign-up page */}
        <button
          onClick={() => navigate(signUpPage)}
          className='btn btn-secondary mt-3'
        >
          Back to Home Page
        </button>
      </div>
    </>
  );
};

export default PageNotFound;
