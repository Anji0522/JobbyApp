import {useState, useEffect, useCallback} from 'react'
import Cookies from 'js-cookie'
import {FaStar, FaBriefcase, FaMapMarkerAlt} from 'react-icons/fa'
import {Link} from 'react-router-dom'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const JobsList = props => {
  const {employmentTypes, salaryRange, searchInput} = props

  const [jobsList, setJoblist] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getJobsApi = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')
    const employmentTypeParam = employmentTypes.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeParam}&minimum_package=${salaryRange}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachData => ({
        id: eachData.id,
        companyLogoUrl: eachData.company_logo_url,
        employmentType: eachData.employment_type,
        jobDescription: eachData.job_description,
        location: eachData.location,
        packagePerAnnum: eachData.package_per_annum,
        rating: eachData.rating,
        title: eachData.title,
      }))

      setJoblist(updatedData)
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }, [employmentTypes, salaryRange, searchInput])

  useEffect(() => {
    getJobsApi()
  }, [getJobsApi, employmentTypes, salaryRange, searchInput])

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <p>Loading...</p>
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={getJobsApi}>
        Retry
      </button>
    </div>
  )

  const renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  const renderJobsListView = () => {
    if (jobsList.length === 0) {
      return renderNoJobsView()
    }

    return (
      <ul className="job-list-container">
        {jobsList.map(job => (
          <Link to={`/jobs/${job.id}`} className="job-link" key={job.id}>
            <li className="jobs-container">
              <div className="job-header">
                <img
                  className="job-logo"
                  src={job.companyLogoUrl}
                  alt="company logo"
                />

                <div className="job-title-container">
                  <h1 className="title">{job.title}</h1>

                  <div className="rating-container">
                    <FaStar className="star" />
                    <p className="rating">{job.rating}</p>
                  </div>
                </div>
              </div>

              <div className="job-details-container">
                <div className="job-info">
                  <div className="info-item">
                    <FaMapMarkerAlt className="icon" />
                    <p className="info-text">{job.location}</p>
                  </div>

                  <div className="info-item">
                    <FaBriefcase className="icon" />
                    <p className="info-text">{job.employmentType}</p>
                  </div>
                </div>

                <p className="package">{job.packagePerAnnum}</p>
              </div>

              <hr className="line" />

              <h2 className="description-heading">Description</h2>

              <p className="description">{job.jobDescription}</p>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  const renderJobsContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderJobsListView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return <div className="job-list-main-container">{renderJobsContent()}</div>
}

export default JobsList
