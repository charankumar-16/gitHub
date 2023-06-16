import {Component} from 'react'

import Loader from 'react-loader-spinner'

import RepositoryItem from '../RepositoryItem'

import LanguageFilterItem from '../LanguageFilterItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    reposList: [],
    apiStatus: apiStatusConstants.loading,
    ActiveLanguage: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    this.setState({apiStatus: apiStatusConstants.loading})
    const {ActiveLanguage} = this.state
    console.log(ActiveLanguage)
    const url = `https://apis.ccbp.in/popular-repos?language=${ActiveLanguage}`
    const options = {method: 'GET'}
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const update = {
        popularRepos: data.popular_repos,
      }
      const {popularRepos} = update

      const updatedData = popularRepos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))
      this.setState({
        reposList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.statusCode) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickUpdateLanguage = id => {
    this.setState({ActiveLanguage: id}, this.getRepos)
  }

  renderProductsList = () => {
    const {reposList} = this.state

    return (
      <>
        <ul className="repos-bg-container">
          {reposList.map(eachItem => (
            <RepositoryItem key={eachItem.id} repository={eachItem} />
          ))}
        </ul>
      </>
    )
  }

  renderLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailure = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view "
        className="fail-img"
      />
      <h1 className="wrong-text">Something Went Wrong</h1>
    </div>
  )

  switchCondition = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsList()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.loading:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    const {ActiveLanguage} = this.state

    return (
      <div className="bg-container">
        <h1 className="main-head">Popular</h1>
        <ul className="language-filter">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              list={eachItem}
              updateFun={this.onClickUpdateLanguage}
              isActive={eachItem.id === ActiveLanguage}
            />
          ))}
        </ul>

        <div className="display-repos">{this.switchCondition()}</div>
      </div>
    )
  }
}

export default GithubPopularRepos
