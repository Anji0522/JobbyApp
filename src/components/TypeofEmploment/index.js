import './index.css'

const TypeofEmploment = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    employmentTypes,
    salaryRange,
    onChangeEmploymentType,
    onChangeSalaryRange,
  } = props

  return (
    <aside className="filter-container" aria-label="Filter jobs">
      <fieldset className="filter-group">
        <legend className="filter-heading">Type of Employment</legend>
        <ul className="list-item-container">
          {employmentTypesList.map(each => (
            <li className="list-items" key={each.employmentTypeId}>
              <label className="label">
                <input
                  type="checkbox"
                  className="checkbox"
                  value={each.employmentTypeId}
                  checked={employmentTypes.includes(each.employmentTypeId)}
                  onChange={() => onChangeEmploymentType(each.employmentTypeId)}
                />
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className="filter-group">
        <legend className="filter-heading">Salary Range</legend>
        <ul className="list-item-container">
          {salaryRangesList.map(each => (
            <li className="list-items" key={each.salaryRangeId}>
              <label className="label">
                <input
                  type="radio"
                  name="salary"
                  className="radio"
                  value={each.salaryRangeId}
                  checked={salaryRange === each.salaryRangeId}
                  onChange={() => onChangeSalaryRange(each.salaryRangeId)}
                />
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
    </aside>
  )
}

export default TypeofEmploment
