// Stylesheet import
import '../../styles/dashboard.css';

// Routes import
import { loginPage, resetPassword, signUpPage } from '../../routes';

// React-router-dom import
import { useNavigate } from 'react-router-dom';

// Logo import
import logo from '../../assets/dashboard_AUF-logos_transparent.png';

// Home page object function
const Dashboard = () => {
  // React-user-dom useNavigate hook
  const navigate = useNavigate();

  return (
    <>
      {/* Page wrapper */}
      <div className='dashboard-page-wrapper app-bg'>
        {/* Page content container */}
        <div className='cover-container d-flex w-100 p-3 mx-auto flex-column'>
          {/* Dashboard body */}
          <main className='dashboard-body mx-auto'>
            <div className='dashboard-text text-center'>
              {/* Logo container */}
              <div className='logo-container-dash mx-auto mb-4'>
                {/* Logo image */}
                <img
                  src={logo}
                  alt='Logo'
                  className='img-fluid logo-dashboard'
                />
              </div>
              {/* Dashboard body text */}
              <div className='display-6 mb-4 text-black'>
                Thank you for taking the time to engage with my project!{' '}
              </div>
              {/* Dashboard body text */}
              <p className='mt-4 blockquote text-secondary'>
                Feel free to navigate around the user flow and don't forget to
                try the reset email page 👇
              </p>
              {/* Button group */}
              <div
                className='mt-1 btn-group'
                role='group'
                aria-label='Basic outlined example'
              >
                {/* Sign-up page link */}
                <button
                  onClick={() => navigate(signUpPage)}
                  className='btn btn-outline-primary py-1 btn-sm'
                >
                  Sign-Up Page
                </button>
                {/* Logout page link */}
                <button
                  onClick={() => navigate(loginPage)}
                  className='btn btn-outline-primary py-1 btn-sm'
                >
                  Login Page
                </button>
                <button
                  onClick={() => navigate(resetPassword)}
                  className='btn btn-outline-primary py-1 btn-sm'
                >
                  Reset Password Page
                </button>
              </div>

              {/* Dashboard footer content */}
              <div className='mt-5 dashboard-footer-content'>
                {/* GitHub link */}
                <code className='text-secondary'>
                  Check the code out in my{' '}
                  <a href='https://github.com/WesleyErasmus/authentication-user-flow'>
                    Github
                  </a>{' '}
                  profile or say hi 👋 on {/* LinkedIn link */}
                  <a href='https://www.linkedin.com/in/wesley-erasmus-75a72a1ba/'>
                    LinkedIn
                  </a>
                  .
                </code>
                <div>
                  <p className='readme-text mt-5 badge text-bg-dark'>
                    View the Authentication User Flow {/* App readme link */}
                    <span>
                      <code className='readme-text-link'>
                        <a href=''>README</a>
                      </code>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
