// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {list, updateFun, isActive} = props
  const {language, id} = list

  const activeTab = isActive ? 'active-tab' : ''

  const funUpdate = () => {
    updateFun(id)
  }

  return (
    <li>
      <button
        className={`${activeTab} language-btn`}
        type="button"
        onClick={funUpdate}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
