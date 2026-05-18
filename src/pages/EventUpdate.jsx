import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'

function EventUpdate() {

  const { eventId } = useParams()

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: 'Other'
  })

  useEffect(() => {

    const fetchEvent = async () => {

      try {

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/event/${eventId}`
        )

        setFormData({
          title: response.data.title,
          description: response.data.description,
          date: response.data.date?.split('T')[0],
          location: response.data.location,
          category: response.data.category
        })

      } catch (err) {
        console.log(err)
      }
    }

    fetchEvent()

  }, [eventId])

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {

    event.preventDefault()

    try {

      const token = localStorage.getItem('token')

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/event/${eventId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      navigate(`/event/${eventId}`)

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>

      <h1>Update Event</h1>

      <form onSubmit={handleSubmit}>

        <input
          type='text'
          name='title'
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type='text'
          name='description'
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type='date'
          name='date'
          value={formData.date}
          onChange={handleChange}
        />

        <input
          type='text'
          name='location'
          value={formData.location}
          onChange={handleChange}
        />

        <select
          name='category'
          value={formData.category}
          onChange={handleChange}
        >
          <option value='Study'>Study</option>
          <option value='Fun'>Fun</option>
          <option value='Work'>Work</option>
          <option value='Other'>Other</option>
        </select>

        <button type='submit'>
          Update
        </button>

      </form>

    </div>
  )
}

export default EventUpdate

