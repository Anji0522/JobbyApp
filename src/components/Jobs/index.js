import {useState} from 'react'
import {BsSearch} from 'react-icons/bs' // Imports search icon if used in design CSS layout

import Profile from '../Profile'
import Header from '../Header'
import TypeofEmployment from '../TypeofEmploment' // Kept filename exactly matching your imports
import JobsList from '../JobsList'

import './index.css'

const Jobs = props => {
  const {employmentTypesList, salaryRangesList} = props

  const [searchInput, setSearchInput] = useState('')
  const [activeSearch, setActiveSearch] = useState('')
  const [employmentTypes, setEmploymentTypes] = useState([])
  const [salaryRange, setSalaryRange] = useState('')

  const onChangeSearchInput = e => {
    setSearchInput(e.target.value)
  }

  const onEnterSearch = e => {
    if (e.key === 'Enter') {
      setActiveSearch(searchInput)
    }
  }

  const onClickSearchIcon = () => {
    setActiveSearch(searchInput)
  }

  const onChangeEmploymentType = typeId => {
    if (employmentTypes.includes(typeId)) {
      setEmploymentTypes(employmentTypes.filter(each => each !== typeId))
    } else {
      setEmploymentTypes([...employmentTypes, typeId])
    }
  }

  const onChangeSalaryRange = rangeId => {
    setSalaryRange(rangeId)
  }

  return (
    <>
      <Header />
      <main className="jobs-main-container">
        <aside className="jobs-sidebar">
          <Profile />
          <hr />
          <TypeofEmployment
            salaryRangesList={salaryRangesList}
            employmentTypesList={employmentTypesList}
            employmentTypes={employmentTypes}
            salaryRange={salaryRange}
            onChangeEmploymentType={onChangeEmploymentType}
            onChangeSalaryRange={onChangeSalaryRange}
          />
        </aside>
        <section className="job-search-container" aria-label="Job listings">
          <div className="search-input-container">
            <input
              className="search-input"
              placeholder="Search"
              type="search"
              value={searchInput}
              onChange={onChangeSearchInput}
              onKeyDown={onEnterSearch}
            />
            <button
              type="button"
              onClick={onClickSearchIcon}
              data-testid="searchButton"
              className="search-button"
            >
              <BsSearch className="search-icon" /> Search
            </button>
          </div>
          <JobsList
            employmentTypes={employmentTypes}
            salaryRange={salaryRange}
            searchInput={activeSearch}
          />
        </section>
      </main>
    </>
  )
}

export default Jobs
