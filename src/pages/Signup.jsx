import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router';

function Signup() {

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

  async function handleSubmit(event) {

    event.preventDefault();

    try {

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/sign-up`,
        formData
      );

      navigate('/sign-in');

    } catch (err) {

      setErrorMessage(
        err.response?.data?.err ||
        'An error occurred during sign up'
      );
    }
  }

  return (

    <div className='auth-page'>

      <div className='auth-card'>

        <h1 className='page-title'>
          Create Account
        </h1>

        <p className='page-subtitle'>
          Join E-Planner and start organizing events easily.
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
            Sign Up
          </button>

        </form>

        {errorMessage && (
          <p className='error-text' role='alert'>
            {errorMessage}
          </p>
        )}

        <p style={{ marginTop: '20px', color: '#cbd5e1' }}>
          Already have an account?{' '}
          <Link
            to='/sign-in'
            style={{ color: '#60a5fa' }}
          >
            Sign in
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;