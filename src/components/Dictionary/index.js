import {Component} from 'react'

import {GrFormSearch} from 'react-icons/gr'

import './index.css'

const apiToken = 'f423333bc4c780a8fed5fcf8f3192b67993d3a10'

class Dictionary extends Component {
  state = {username: '', wordData: {}, noData: [], showWordDetails: false}

  onChangeInput = event => {
    this.setState({
      username: event.target.value,
      wordData: {},
      noData: [],
      showWordDetails: false,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username} = this.state

    if (username.length !== 0) {
      const apiUrl = `https://owlbot.info/api/v4/dictionary/${username}`
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Token ${apiToken}`,
        },
      }
      const response = await fetch(apiUrl, options)
      const data = await response.json()

      if (response.status === 404) {
        this.setState({
          noData: data,
          wordData: {},
          showWordDetails: false,
        })
      } else {
        this.setState({
          username: '',
          showWordDetails: true,
          wordData: data,
          noData: [],
        })
      }
    } else {
      this.setState({
        username: '',
        showWordDetails: false,
        noData: [],
        wordData: {},
      })
    }
  }

  renderListOfMeanings = props => {
    const emojiCondition = props.emoji !== null
    const imageCondition = props.image_url !== null
    const exampleCondition = props.example !== ''

    return (
      <li key={props.definition} className="list-item">
        {imageCondition && (
          <img alt={props.image_url} className="image" src={props.image_url} />
        )}
        <div className="meaning-container">
          <h1 className="type-heading">
            Type : <span className="type-span-element">{props.type}</span>
          </h1>
          <h1 className="type-heading">
            Definition :{' '}
            <span className="type-span-element">{props.definition}</span>
          </h1>
          {exampleCondition && (
            <h1 className="type-heading">
              Example :{' '}
              <span className="type-span-element">{props.example}</span>
            </h1>
          )}
          {emojiCondition && (
            <h1 className="type-heading">
              Emoji :<span className="emoji-span-element">{props.emoji}</span>
            </h1>
          )}
        </div>
      </li>
    )
  }

  renderOutputOfWords = () => {
    const {wordData} = this.state
    const {word, pronunciation, definitions} = wordData

    const pronunciationConditon = pronunciation !== null

    return (
      <div className="words-data-container">
        <h1 className="words-data-heading">
          Word : <span className="word-data-span-element"> {word} </span>
        </h1>
        {pronunciationConditon && (
          <h1 className="word-pronunciation-heading">
            pronunciation :
            <span className="word-data-span-element"> {pronunciation} </span>
          </h1>
        )}
        <ul className="list-of-meanings-container">
          {definitions.map(eachDef => this.renderListOfMeanings(eachDef))}
        </ul>
      </div>
    )
  }

  render() {
    const {username, showWordDetails, noData} = this.state

    return (
      <div className="dictionary-app">
        <h1 className="dictionary-app-heading">Welcome to Dictionary App!</h1>
        <p className="dictionary-app-paragraph">
          Comprehensive Word Information
        </p>
        <form className="input-form-container" onSubmit={this.onSubmitForm}>
          <input
            type="text"
            placeholder="Enter Word"
            className="word-input"
            value={username}
            onChange={this.onChangeInput}
          />
          <button type="submit" className="submit-button">
            <GrFormSearch className="search-icon" />
          </button>
        </form>
        {showWordDetails && this.renderOutputOfWords()}
        {noData.length > 0 && (
          <div className="not-found-results-container">
            <h1 className="not-found-heading">
              No Definition for
              <span className="span-element"> {username} </span>
            </h1>
          </div>
        )}
      </div>
    )
  }
}

export default Dictionary
