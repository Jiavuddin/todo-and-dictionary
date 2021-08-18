import {MdEdit, MdDelete} from 'react-icons/md'

import {Component} from 'react'

import {v4 as uniqueId} from 'uuid'

import './index.css'

class TodoList extends Component {
  constructor(props) {
    super(props)

    const todoList = localStorage.getItem('list_of_todo_items')

    const list = JSON.stringify([])

    if (todoList === null) {
      localStorage.setItem('list_of_todo_items', list)
    } else {
      localStorage.setItem('list_of_todo_items', todoList)
    }

    const listOfTodos = localStorage.getItem('list_of_todo_items')

    this.state = {
      userInput: '',
      listOfTodos: JSON.parse(listOfTodos),
    }
  }

  onDeleteTodoListItem = id => {
    this.setState(prevState => ({
      listOfTodos: prevState.listOfTodos.filter(eachTodo => eachTodo.id !== id),
    }))
  }

  onShowTodoInput = id => {
    this.setState(prevState => ({
      listOfTodos: prevState.listOfTodos.map(eachTodo => {
        if (eachTodo.id === id) {
          return {...eachTodo, showTodoInput: true}
        }
        return eachTodo
      }),
    }))
  }

  onChangeTodoListInput = (value, id) => {
    this.setState(prevState => ({
      listOfTodos: prevState.listOfTodos.map(eachTodo => {
        if (eachTodo.id === id) {
          return {...eachTodo, todo: value}
        }
        return eachTodo
      }),
    }))
  }

  onSubmitTodoListForm = id => {
    this.setState(prevState => ({
      listOfTodos: prevState.listOfTodos.map(eachTodo => {
        if (eachTodo.id === id) {
          return {...eachTodo, showTodoInput: false}
        }
        return eachTodo
      }),
    }))
  }

  onChangeTodoCheckBox = (value, id) => {
    this.setState(prevState => ({
      listOfTodos: prevState.listOfTodos.map(eachTodo => {
        if (eachTodo.id === id) {
          return {...eachTodo, isChecked: !eachTodo.isChecked}
        }
        return eachTodo
      }),
    }))
  }

  onSubmitTodoForm = event => {
    event.preventDefault()

    const {userInput} = this.state

    if (userInput.length !== 0) {
      const todoObject = {
        id: uniqueId(),
        todo: userInput,
        isChecked: false,
        showTodoInput: false,
      }

      const {listOfTodos} = this.state

      if (listOfTodos.length !== 0) {
        const existingTodoList = listOfTodos.filter(
          eachTodo => eachTodo.todo === userInput,
        )
        if (existingTodoList.length === 0) {
          this.setState(prevState => ({
            userInput: '',
            listOfTodos: [...prevState.listOfTodos, todoObject],
          }))
        } else {
          this.setState({userInput: ''})
        }
      } else {
        this.setState(prevState => ({
          userInput: '',
          listOfTodos: [...prevState.listOfTodos, todoObject],
        }))
      }
    }
  }

  onChangeTodoInput = event => {
    this.setState({userInput: event.target.value})
  }

  renderListItem = props => {
    const {id, todo, isChecked, showTodoInput} = props

    const onDeleteTodoListItem = () => {
      this.onDeleteTodoListItem(id)
    }

    const OnShowTodoInput = () => {
      this.onShowTodoInput(id)
    }

    const onChangeTodoListInput = event => {
      this.onChangeTodoListInput(event.target.value, id)
    }

    const onSubmitTodoListForm = event => {
      event.preventDefault()
      this.onSubmitTodoListForm(id)
    }

    const onChangeCheckBoxInput = event => {
      this.onChangeTodoCheckBox(event.target.value, id)
    }

    return (
      <li key={id} className="todo-list-app-list-item">
        <div className="todo-list-app-list-item-input-container">
          <input
            onChange={onChangeCheckBoxInput}
            type="checkbox"
            className="input-container-checkbox-input"
            checked={isChecked}
          />
          {showTodoInput ? (
            <form
              className="input-container-form-container"
              onSubmit={onSubmitTodoListForm}
            >
              <input
                type="text"
                className="form-container-input-element"
                value={todo}
                onChange={onChangeTodoListInput}
              />
            </form>
          ) : (
            <p className="form-container-todo-name">{todo}</p>
          )}
        </div>
        <div className="edit-delete-todo-list-container">
          {!showTodoInput && (
            <MdEdit className="todo-list-edit-icon" onClick={OnShowTodoInput} />
          )}
          <MdDelete
            className="todo-list-delete-icon"
            onClick={onDeleteTodoListItem}
          />
        </div>
      </li>
    )
  }

  render() {
    const {userInput, listOfTodos} = this.state

    const list = JSON.stringify(listOfTodos)

    localStorage.setItem('list_of_todo_items', list)

    return (
      <div className="todo-list-app-container">
        <h1 className="todo-list-app-heading">My Todos</h1>
        <form
          className="todo-list-app-form-container"
          onSubmit={this.onSubmitTodoForm}
        >
          <input
            type="text"
            className="todo-list-app-form-input-element"
            placeholder="Enter a Todo"
            value={userInput}
            onChange={this.onChangeTodoInput}
          />
          <button type="submit" className="todo-list-app-form-save-button">
            Save
          </button>
        </form>
        {listOfTodos.length > 0 && (
          <ul className="todo-list-app-list-container">
            {listOfTodos.map(eachTodo => this.renderListItem(eachTodo))}
          </ul>
        )}
      </div>
    )
  }
}

export default TodoList
