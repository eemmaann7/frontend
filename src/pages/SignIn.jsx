import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router';

function SignIn({ setUser }) {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/sign-in`,
        formData
      );

      const token = response.data.token;

      const userInfo = JSON.parse(
        atob(token.split('.')[1])
      ).payload;

      setUser(userInfo);

      localStorage.setItem('token', token);

      navigate('/dashboard');

    } catch (err) {

      setErrorMessage(
        err.response?.data?.err ||
        'An error occurred during sign in'
      );
    }
  };

  return (

    <div className='auth-page'>

      <div className='auth-card'>

        <h1 className='page-title'>
          Welcome Back
        </h1>

        <p className='page-subtitle'>
          Sign in to continue managing your events.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            id='username'
            name='username'
            type='text'
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            id='password'
            name='password'
            type='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type='submit'>
            Sign In
          </button>

        </form>

        {errorMessage && (
          <p className='error-text' role='alert'>
            {errorMessage}
          </p>
        )}

        <p style={{ marginTop: '20px', color: '#cbd5e1' }}>
          Don’t have an account?{' '}
          <Link
            to='/sign-up'
            style={{ color: '#60a5fa' }}
          >
            Create one
          </Link>
        </p>

      </div>

    </div>
  );
}

export default SignIn;