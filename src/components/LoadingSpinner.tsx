// Styling import
import '../styles/loadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <>
      <div>
        {/* Page wrapper */}
        <div className='loading-spinner-page-wrapper'>
            {/* Spinner background */}
          <div className='loading-spinner-bg text-center p-5'>
            {/* Loading spinner */}
            <div
              className='loading-spinner spinner-border text-primary'
              role='status'
            >
              <span className='visually-hidden'>Loading...</span>
            </div>
            {/* Loading text */}
            <p className='loading-text blockquote mb-0'>
              Loading...
            </p>
          </div>
        </div>
        {/* Spinner background */}
        <div className='modal-backdrop fade show'></div>
      </div>
    </>
  );
};

export default LoadingSpinner;
