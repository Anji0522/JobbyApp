import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'

import './index.css'

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    profileImageUrl: '',
    shortBio: '',
  })

  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const getProfile = async () => {
    setLoading(true)
    setHasError(false)

    const jwtToken = Cookies.get('jwt_token')

    const api = 'https://apis.ccbp.in/profile'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(api, options)
      const data = await response.json()

      if (response.ok) {
        const updatedData = {
          name: data.profile_details.name,
          profileImageUrl: data.profile_details.profile_image_url,
          shortBio: data.profile_details.short_bio,
        }

        setProfile(updatedData)
      } else {
        setHasError(true)
      }
    } catch (error) {
      setHasError(true)
    }

    setLoading(false)
  }

  useEffect(() => {
    getProfile()
  }, [])

  if (loading) {
    return (
      <div className="profile-container">
        <p className="loading-text">Loading...</p>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="profile-container">
        <button className="retry-button" type="button" onClick={getProfile}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <img
        className="profile-image"
        src={profile.profileImageUrl}
        alt="profile"
      />
      <h1 className="name">{profile.name}</h1>
      <p className="bio">{profile.shortBio}</p>
    </div>
  )
}

export default Profile
