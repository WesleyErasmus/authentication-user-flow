// Stylesheet import
import '../styles/authenticationModal.css';

// React state hook import
import { ReactNode, useState } from 'react';

// Auth modal object function
const AuthenticationModal = (props: {
  modalTitle: string;
  signUpValidationMessage: string | ReactNode; // accepts a string or a React node / component
  closeModal: () => void;
  modalTheme?: boolean; // optional prop
}) => {
  // Display modal state (used to set modal visibility to true and for the closeModal function)
  const [displayModal, setDisplayModal] = useState(true);
  // Success and Failure modal color themes
  const { modalTheme } = props;

  // Close modal function which changes the modal state to false when triggered
  const closeModal = () => {
    setDisplayModal(false);
    // Call the closeModal function passed via props
    props.closeModal();
  };

  return (
    <div>
      {/* Managing visibility of the modal state using shorthand conditional rendering */}
      {displayModal && (
        // Inline styling to override the Bootstrap modal class default display:hidden property
        <div
          className={`modal ${
            modalTheme === true
              ? 'success-modal'
              : modalTheme === false
              ? 'failure-modal'
              : 'welcome-popup'
          } show`}
          style={{ display: 'block' }}
        >
          {/* Modal */}
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                {/* Modal close button */}
                <button
                  type='button'
                  className='btn-close'
                  aria-label='Close'
                  onClick={closeModal}
                ></button>
              </div>
              {/* Modal body: user sign-up validation message with icon. Displayed with ternary operator on condition of submit failed or success */}
              <div className='modal-body text-center py-0 px-4'>
                {/* Using explicit checks to allow for no icon to be displayed on the welcome pop-up */}
                {modalTheme === true ? (
                  <i className='modal-title-icon bi bi-check-circle'></i>
                ) : modalTheme === false ? (
                  <i className='modal-title-icon bi bi-x-circle'></i>
                ) : (
                  <span></span>
                )}
                <h2
                  className='modal-title text-center mb-1'
                  id='staticBackdropLabel'
                >
                  {props.modalTitle}
                </h2>
                <p className='user-validation-message blockquote mb-1'>
                  <small>{props.signUpValidationMessage}</small>
                </p>
              </div>
              {/* Modal footer */}
              <div className='modal-footer mb-3'>
                {/*  */}
                <div className='mx-auto text-center'>
                  <button
                    type='button'
                    className={
                      modalTheme === true
                        ? `btn btn-outline-success`
                        : modalTheme === false
                        ? `btn btn-outline-danger`
                        : `btn btn-secondary px-5`
                    }
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Conditionally rendering Bootstrap modal backdrop */}
      {displayModal && (
        <div className='modal-backdrop fade show' onClick={closeModal}></div>
      )}
    </div>
  );
};

export default AuthenticationModal;
