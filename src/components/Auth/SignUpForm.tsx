import "../../styles/signUpForm.css";
// Formik Import
import { Formik, Field, Form, ErrorMessage } from "formik";

// Yup Import
import * as Yup from "yup";

/* FormValues is a custom type created to define the structure of an object representing form values. See doc below on representing data through an interface:
https://www.typescriptlang.org/docs/handbook/2/objects.html */

// Define the shape and validation of the form values
interface FormValues {
  firstName: string;
  surname: string;
  email: string;
  password: string;
}

/* Constant variable named initialValues
This variable will store the initial values for a form
It is declared to adhere to the FormValues type structure 
 👇 */
const initialValues: FormValues = {
  // Define the initial values of the form fields as empty strings
  firstName: "",
  surname: "",
  email: "",
  password: "",
};

// Form Submit Handler
const handleSubmit = (values: FormValues) => {
  console.log(values);
};

// Yup validation schema / Error Messages
const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(
      20,
      "You have exceeded the maximum number of characters. Please use 20 characters or less."
    )
    .required("First name is required"),
  surname: Yup.string()
    .max(
      30,
      "You have exceeded the maximum number of characters. Please use 30 characters or less."
    )
    .required("Surname is required"),
  email: Yup.string()
    .email("Please use a valid email address")
    .required("Email address is required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "Your password requires a number")
    .matches(/[a-z]/, "Your password requires a lowercase letter")
    .matches(/[A-Z]/, "Your password requires an uppercase letter")
    .matches(/[^\w]/, "Your password requires a symbol")
    .required("Password is required"),
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
  return (
    // Formik opening tag including the state of the form input fields, the form handle submit function, and the Yup validation schema
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <div className="container mt-5 form-container">
        <div className="row justify-content-center">
          <div className="col">
            <div className="card">
              {/* Form Title */}
              <h2 className="text-center mt-5">{props.formTitle}</h2>
              <div className="card-body py-md-4">
                {/* Sign-Up form using Formik */}
                <Form>
                  {/* First name / Surname row container */}
                  <div className="row g-3">
                    <div className="col">
                      {/* First name input */}
                      <Field
                        className="form-control"
                        name="firstName"
                        type="text"
                        id="firstName"
                        placeholder={props.firstName}
                      />
                      {/* Formik/Yup validation error message */}
                      <p className="validation-error-message">
                        <ErrorMessage name="firstName" />
                      </p>
                    </div>
                    <div className="col">
                      {/* Surname input */}
                      <Field
                        className="form-control"
                        name="surname"
                        type="text"
                        id="surname"
                        placeholder={props.surname}
                      />
                      {/* Formik/Yup validation error message */}
                      <p className="validation-error-message">
                        <ErrorMessage name="surname" />
                      </p>
                    </div>
                  </div>
                  <div className="col">
                    {/* Email input */}
                    <Field
                      className="form-control"
                      name="email"
                      type="email"
                      id="email"
                      placeholder={props.email}
                    />
                    {/* Formik/Yup validation error message */}
                    <p className="validation-error-message">
                      <ErrorMessage name="email" />
                    </p>
                  </div>
                  <div className="col">
                    {/* Password input */}
                    <Field
                      className="form-control"
                      name="password"
                      type="password"
                      id="password"
                      placeholder={props.password}
                    />
                    {/* Formik/Yup validation error message */}
                    <p className="validation-error-message">
                      <ErrorMessage name="password" />
                    </p>
                    {/* Password requirements text */}
                    <p className="password-requirements-text">
                      <small>
                        Password must be at least 8 characters long and include
                        uppercase and lowercase letters, a number, and a special
                        character.
                      </small>
                    </p>
                  </div>
                  {/* Form button group */}
                  <div className="d-grid gap-2 col-8 mx-auto text-center">
                    {/* Create account button */}
                    <button type="submit" className="btn btn-primary mt-4">
                      {props.submitButton}
                    </button>
                    <span className="span-btn-spacer">Or</span>
                  </div>
                </Form>
                <div className="d-grid gap-2 col-8 mx-auto text-center mt-2">
                  {/* Login page link */}
                  <button className="btn btn-success mb-4">
                    {props.redirect}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Formik>
  );
};

export default SignUpForm;