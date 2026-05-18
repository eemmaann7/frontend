import { Link, useNavigate } from 'react-router'

function Navbar({ user, setUser }) {

  const navigate = useNavigate()

  function logOut() {

    localStorage.removeItem('token')

    setUser(null)

    navigate('/')
  }

  return (

    <div className='navbar'> 

      <Link className='nav-item' to='/'>
        Home
      </Link>

      <Link className='nav-item' to='/events'>
        All Events
      </Link>

      {user ? (
        <>

          <Link className='nav-item' to='/dashboard'>
            Dashboard
          </Link>

          <Link className='nav-item' to='/event/create'>
            Create Event
          </Link>

          <span className='nav-item'>
            {user.username}
          </span>

          <button className='nav-item' onClick={logOut}>
            Log Out
          </button>

        </>
      ) : (
        <>

          <Link className='nav-item' to='/sign-up'>
            Sign Up
          </Link>

          <Link className='nav-item' to='/sign-in'>
            Sign In
          </Link>

        </>
      )}

    </div>
  )
}

export default Navbar