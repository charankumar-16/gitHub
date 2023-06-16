// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repository} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = repository

  return (
    <li className="repos-container">
      <img src={avatarUrl} alt={name} className="avatar-img" />
      <h1 className="repo-name">{name}</h1>
      <div className="repo-img">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="star-img"
        />
        <p className="star-count">{starsCount} stars</p>
      </div>
      <div className="repo-img">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="star-img"
        />
        <p className="star-count">{forksCount} forks</p>
      </div>{' '}
      <div className="repo-img">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="star-img"
        />
        <p className="star-count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
