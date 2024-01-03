import "./styles/App.css";
// Importing useNavigate hook
import { useNavigate } from 'react-router-dom';
import { dashboard, loginPage, signUpPage } from "./routes";
import Home from "./pages/Home/Home";


function App() {
  const navigate = useNavigate();
  return (
    <>
      <nav className='d-flex px-3'>
        <div className='mx-2' onClick={() => navigate(dashboard)}>
          Home
        </div>
        <div className='mx-2' onClick={() => navigate(loginPage)}>
          Login
        </div>
        <div className='mx-2' onClick={() => navigate(signUpPage)}>
          Create Account
        </div>
      </nav>
      <Home />
    </>
  );
}

export default App;
