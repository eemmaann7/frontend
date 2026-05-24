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

      <div className='nav-left'>

        <Link className='logo' to='/'>
          E-Planner
        </Link>

        {user && (
          <Link className='nav-item' to='/events'>
            All Events
          </Link>
        )}

      </div>

      <div className='nav-right'>

        {user ? (
          <>

            <Link className='nav-item' to='/dashboard'>
              Dashboard
            </Link>

            <Link className='nav-item' to='/event/create'>
              Create Event
            </Link>

            <span className='nav-item'>
              Hello, {user.username}
            </span>

            <button onClick={logOut}>
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

    </div>
  )
}

export default Navbar