import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = () => (
  <div className="header-container">
    <ul className="heading-list">
      <Link className="native-link" to="/dictionary">
        <li className="list-item">Dictionary</li>
      </Link>
      <Link className="native-link" to="/todo-list">
        <li className="list-item">TodoList</li>
      </Link>
    </ul>
  </div>
)

export default withRouter(Header)
