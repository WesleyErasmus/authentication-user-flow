const UserGuide = () => {
  return (
    <>
      <div className='text-start'>
        <h5 className='my-4 fw-bold'>
          Here's a quick guide on the authentication user flow functionality:
        </h5>
        <ol>
          <li>
            <p>
              <strong>Sign-up: </strong>New users can create an account using an
              email address and password.
            </p>
          </li>
          <li>
            <p>
              <strong>Login: </strong>Users can log in using the newly created 
              account credentials.
            </p>
          </li>
          <li>
            <p>
              <strong>Reset password: </strong>Try the reset password function
              through the link on the login form.
            </p>
          </li>
          <li>
            <p>
              <strong>Dashboard page: </strong>Upon successful login, you'll be
              directed to the app's dashboard where all the functionality can be
              accessed.
            </p>
          </li>
        </ol>
      </div>
    </>
  );
};

export default UserGuide;
