import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const Login = props => {
  const {history} = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showError, setErrorMsg] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()

    if (response.ok) {
      console.log(data)
      Cookies.set('jwt_token', data.jwt_token, {
        expires: 30,
      })
      history.replace('/')
    } else {
      setErrorMsg(true)
      setError(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-container">
      <div className="logo-card">
        <img
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <form className="form-element" onSubmit={handleSubmit}>
          <div className="login-input-container">
            <div className="input-container">
              <label className="label-element" htmlFor="username">
                USERNAME
              </label>
              <input
                className="input-element"
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label className="label-element" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="input-element"
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {showError && <p className="error-msg">*{error}</p>}
            <button className="login-btn" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
