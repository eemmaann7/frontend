import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router'

function AllEvents() {

  const [events, setEvents] = useState([])

  useEffect(() => {

    const fetchEvents = async () => {

      try {

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/event`
        )

        setEvents(response.data)

      } catch (err) {
        console.log(err)
      }
    }

    fetchEvents()

  }, [])

  return (

    <div className='page-container'>

      <h1>All Events</h1>

      <div className='events-grid'>

        {events.map((event) => (

          <div className='event-card' key={event._id}>

            <h2>{event.title}</h2>

            <p><strong>Category:</strong> {event.category}</p>

            <p>
              <strong>Date:</strong>{' '}
              {new Date(event.date).toLocaleDateString()}
            </p>

            <Link to={`/event/${event._id}`}>

              <button>
                View Details
              </button>

            </Link>

          </div>

        ))}

      </div>

    </div>
  )
}

export default AllEvents