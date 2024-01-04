import LoginForm from "../../components/Auth/LoginForm";

const Login = () => {
  return (
    <>
      <LoginForm
        formTitle="Login"
        email="Email Address *"
        password="Enter Your Password *"
        submitButton="Login"
        redirect="Create Account"
      />
    </>
  );
}

export default Login