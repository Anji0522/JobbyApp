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
    <div className="filter-container">
      <h1 className="filter-heading">Type of Employment</h1>

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

      <hr className="divider" />

      <h1 className="filter-heading">Salary Range</h1>

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
    </div>
  )
}

export default TypeofEmploment
