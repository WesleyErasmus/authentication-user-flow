import SignUpForm from '../../components/Auth/SignUpForm'

const SignUp = () => {
  return (
    <>
    {/* SignUp Form with Props for form title and input field placeholder text */}
      <SignUpForm
        formTitle="Sign-Up"
        firstName="First Name *"
        surname="Surname *"
        email="Email Address *"
        password="Create new password *"
        submitButton="Create Account"
        redirect="Login"
      />
    </>
  );
}

export default SignUp