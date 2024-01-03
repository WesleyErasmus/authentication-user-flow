// Stylesheet import
import '../../styles/dashboard.css';
import { loginPage, signUpPage } from '../../routes';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // React-user-dom useNavigate hook
  const navigate = useNavigate();

  return (
    <>
      <div className='cover-container d-flex w-100 h-100 p-3 mx-auto flex-column'>
        <header className='mb-auto'>
          <div>
            {/* Navbar jumbotron */}
            <h5 className='float-md-start mb-0'>Authentication User Flow</h5>
            <nav className='nav justify-content-center float-md-end'>
              {/* Create new account nac link */}
              <a
                onClick={() => navigate(signUpPage)}
                className='nav-link fw-bold py-1 px-0 mx-2'
                href='#'
              >
                Create New Account
              </a>
              {/* Logout nav link */}
              <a
                onClick={() => navigate(loginPage)}
                className='nav-link fw-bold py-1 px-0 mx-2'
                href='#'
              >
                Logout
              </a>
            </nav>
          </div>
        </header>
        {/* Dashboard body */}
        <main className='dashboard-body px-3'>
          <div className='dashboard-text'>
            <h1>Dashboard</h1>
            <p className='lead'>Welcome to your dashboard!</p>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
