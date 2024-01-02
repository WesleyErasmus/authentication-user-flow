import { useState } from "react";

const SignUpModal = (props: {
  modalTitle: string;
  signUpValidationMessage: string;
  redirectLink: string;
  closeModal: () => void;
}) => {
  // Display modal state (used to set modal visibility to true and for the closeModal function)
  const [displayModal, setDisplayModal] = useState(true);

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
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                {/* Modal Title prop */}
                <h5 className="modal-title" id="staticBackdropLabel">
                  {props.modalTitle}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              {/* Modal body: user sign-up validation message */}
              <div className="modal-body">
                <p>{props.signUpValidationMessage}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
                {/* Modal login or try again redirect button */}
                <button type="button" className="btn btn-primary">
                  {props.redirectLink}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Conditionally rendering Bootstrap modal backdrop */}
      {displayModal && (
        <div className="modal-backdrop fade show" onClick={closeModal}></div>
      )}
    </div>
  );
};

export default SignUpModal;
