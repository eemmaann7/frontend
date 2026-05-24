import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router'

function EventDetails({ user }) {

  const [event, setEvent] = useState(null)

  const { eventId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {

    fetchEvent()

  }, [eventId])

  const fetchEvent = async () => {

    try {

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/event/${eventId}`
      )

      setEvent(response.data)

    } catch (err) {
      console.log(err)
    }
  }

  const handleAttend = async () => {

    try {

      const token = localStorage.getItem('token')

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/attendence/${eventId}`,
        {
          status: 'going'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert('Joined event')

      fetchEvent()

    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async () => {

    try {

      const token = localStorage.getItem('token')

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/event/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      navigate('/events')

    } catch (err) {
      console.log(err)
    }
  }

  if (!event) {
    return <h1>Loading...</h1>
  }

  return (

    <div className='page-container'>

      <Link className='back-btn' to='/events'>
        ← Back to Events
      </Link>

      <div className='details-card'>

        <h1>{event.title}</h1>

        <p>{event.description}</p>

        <p>
          <strong>Location:</strong> {event.location}
        </p>

        <p>
          <strong>Category:</strong> {event.category}
        </p>

        <p>
          <strong>Date:</strong>{' '}
          {new Date(event.date).toLocaleDateString()}
        </p>

        <h3 className='attendees-title'>
          Attendees
        </h3>

        {event.attendees.length === 0 ? (

          <p>No attendees yet</p>

        ) : (

          <ul className='attendees-list'>

            {event.attendees.map((attendee) => (

              <li key={attendee._id}>
                {attendee.userId?.username}
              </li>

            ))}

          </ul>

        )}

        {user && (

          <button onClick={handleAttend}>
            Join Event
          </button>

        )}

        {user && user._id === event.createdBy?._id && (

          <div className='details-buttons'>

            <Link to={`/event/${event._id}/edit`}>

              <button>
                Edit
              </button>

            </Link>

            <button onClick={handleDelete}>
              Delete
            </button>

          </div>

        )}

      </div>

    </div>
  )
}

export default EventDetails