import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = ({history}) => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-container" aria-label="Main navigation">
      <Link to="/">
        <img
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>

      {/* The unordered list containing at least 3 list items */}
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/jobs">Jobs</Link>
        </li>
        <li>
          <button onClick={onLogout} type="button" className="button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
