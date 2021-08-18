import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css'

import Header from './components/Header'
import Dictionary from './components/Dictionary'
import TodoList from './components/TodoList'

const App = () => (
  <div className="app-container">
    <Header />
    <Switch>
      <Route exact path="/dictionary" component={Dictionary} />
      <Route exact path="/todo-list" component={TodoList} />
      <Redirect to="/dictionary" />
    </Switch>
  </div>
)

export default App
