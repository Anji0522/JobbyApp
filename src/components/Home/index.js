import {Link} from 'react-router-dom' // Imported Link
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <main className="home-container">
      <h1 className="heading">Find The Job That Fits Your Life</h1>
      <p className="description">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential
      </p>

      <Link to="/jobs" className="home-button">
        Find Jobs
      </Link>
    </main>
  </>
)

export default Home
