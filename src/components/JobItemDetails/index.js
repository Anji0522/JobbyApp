import {useState, useEffect, useCallback} from 'react'
import Cookies from 'js-cookie'
import {FaStar, FaBriefcase, FaMapMarkerAlt} from 'react-icons/fa'
import {BiLinkExternal} from 'react-icons/bi' // Helpful for a professional UI look

import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const JobItemDetails = props => {
  const {match} = props
  const {id} = match.params

  const [jobDetails, setJobDetails] = useState({})
  const [similarJobs, setSimilarJobs] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getJobDetails = useCallback(async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(apiUrl, options)

      if (response.ok) {
        const data = await response.json()

        const updatedJobDetails = {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          title: data.job_details.title,
          skills: data.job_details.skills.map(eachSkill => ({
            imageUrl: eachSkill.image_url,
            name: eachSkill.name,
          })),
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
        }

        const updatedSimilarJobs = data.similar_jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          rating: eachJob.rating,
          title: eachJob.title,
        }))

        setJobDetails(updatedJobDetails)
        setSimilarJobs(updatedSimilarJobs)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch {
      setApiStatus(apiStatusConstants.failure)
    }
  }, [id])

  useEffect(() => {
    getJobDetails()
  }, [getJobDetails])

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
      <button type="button" onClick={getJobDetails} className="button">
        Retry
      </button>
    </div>
  )

  const renderSuccessView = () => (
    <>
      <Header />
      <main className="job-details-main-container">
        <article className="details-container">
          <div className="job-header">
            <img
              className="job-image"
              src={jobDetails.companyLogoUrl}
              alt="job details company logo"
            />
            <div>
              <h1 className="job-title">{jobDetails.title}</h1>
              <div className="rating-container">
                <FaStar className="star-icon" />
                <p className="rating">{jobDetails.rating}</p>
              </div>
            </div>
          </div>

          <div className="job-info">
            <div className="location-type-container">
              <FaMapMarkerAlt />
              <p className="location">{jobDetails.location}</p>
              <FaBriefcase />
              <p className="work-type">{jobDetails.employmentType}</p>
            </div>
            <div className="per-annum">
              <p>{jobDetails.packagePerAnnum}</p>
            </div>
          </div>

          <hr />

          <div className="description-visit-container">
            <h1 className="description-heading">Description</h1>
            <a
              href={jobDetails.companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="visit-link"
            >
              Visit <BiLinkExternal />
            </a>
          </div>

          <div className="about-job">
            <p>{jobDetails.jobDescription}</p>
          </div>

          <div className="skills-container">
            <h1 className="skills-heading">Skills</h1>
            <ul className="list-items-skills">
              {jobDetails.skills?.map(eachSkill => (
                <li key={eachSkill.name} className="skill-item-container">
                  <img
                    src={eachSkill.imageUrl}
                    alt={eachSkill.name}
                    className="skill-image"
                  />
                  <p className="skill-item-name">{eachSkill.name}</p>
                </li>
              ))}
            </ul>

            <div className="life-at-company-container">
              <h1 className="life-at-com">Life at Company</h1>
              <div className="life-at-company-content">
                <p>{jobDetails.lifeAtCompany?.description}</p>
                <img
                  src={jobDetails.lifeAtCompany?.imageUrl}
                  alt="life at company"
                  className="life-at-company-image"
                />
              </div>
            </div>
          </div>
        </article>

        <section
          className="similar-job-container"
          aria-labelledby="similar-jobs-heading"
        >
          <h1 id="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-job-list">
            {similarJobs.map(eachJob => (
              <li key={eachJob.id} className="similar-job-card">
                <div className="job-logo-title">
                  <img
                    src={eachJob.companyLogoUrl}
                    alt="similar job company logo"
                    className="similar-job-image"
                  />
                  <div>
                    <h1 className="developer-role-name">{eachJob.title}</h1>
                    <p className="rating">{eachJob.rating}</p>
                  </div>
                </div>

                <h2 className="heading-description">Description</h2>
                <p>{eachJob.jobDescription}</p>

                <div className="other-info">
                  <p>{eachJob.location}</p>
                  <p>{eachJob.employmentType}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )

  switch (apiStatus) {
    case apiStatusConstants.inProgress:
      return renderLoadingView()
    case apiStatusConstants.success:
      return renderSuccessView()
    case apiStatusConstants.failure:
      return renderFailureView()
    default:
      return null
  }
}

export default JobItemDetails
