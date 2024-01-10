// Stylesheet import
import '../styles/authenticationModal.css';

// React state hook import
import { useState } from 'react';

// Auth modal object function
const AuthenticationModal = (props: {
  modalTitle: string;
  signUpValidationMessage: string;
  redirectLink: string;
  closeModal: () => void;
  modalTheme: boolean;
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
            modalTheme ? 'success-modal' : 'failure-modal'
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
                {modalTheme ? (
                  <i className='modal-title-icon bi bi-check-circle'></i>
                ) : (
                  <i className='modal-title-icon bi bi-x-circle'></i>
                )}
                <h2 className='modal-title text-center mb-1' id='staticBackdropLabel'>
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
                        modalTheme
                          ? `btn btn-outline-success`
                          : `btn btn-outline-danger`
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
