import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function CreateEvent() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category: 'Other'
  })

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

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/event/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      navigate(`/event/${response.data._id}`)

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>

      <h1>Create New Event</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Study">Study</option>
          <option value="Fun">Fun</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit">
          Create Event
        </button>

      </form>

    </div>
  )
}

export default CreateEvent