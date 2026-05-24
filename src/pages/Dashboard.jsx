import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router'

function Dashboard({ user }) {

  const [events, setEvents] = useState([])

  useEffect(() => {

    const fetchEvents = async () => {

      try {

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/event`
        )

        const myEvents = response.data.filter(
          (event) =>
            event.createdBy?._id?.toString() ===
            user._id?.toString()
        )

        setEvents(myEvents)

      } catch (err) {
        console.log(err)
      }
    }

    fetchEvents()

  }, [user])

  return (

    <div className='page-container'>

      <h1 className='page-title'>
        Welcome back, {user.username}
      </h1>

      <h2 className='dashboard-title'>
        My Created Events
      </h2>

      {events.length === 0 ? (

        <div className='empty-state'>
          <h3>No events created yet</h3>
          <p>Create your first event and start planning.</p>
        </div>

      ) : (

        <div className='events-grid'>

          {events.map((event) => (

            <div className='event-card' key={event._id}>

              <h3>{event.title}</h3>

              <p>{event.description}</p>

              <p>
                <strong>Location:</strong> {event.location}
              </p>

              <Link to={`/event/${event._id}`}>

                <button>
                  View Event
                </button>

              </Link>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}

export default Dashboard