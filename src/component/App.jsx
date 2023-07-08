import { useState } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import TodoList from './TodoList';
import List from '../lib/list';

const list = List.use('todos');

const ENTER_KEY = 13;

function App() {
  const [todos, setTodos] = useState([...list.data]);
  const [newTodo, setNewTodo] = useState('');
  const [editing, setEditing] = useState('');

  const toggleAll = !!list.data.length && !List.getTopUnchecked(list).length;

  function handleNewTodoChange(e) {
    setNewTodo(e.target.value);
  }
  function handleNewTodoKeyDown(e) {
    if (e.keyCode !== ENTER_KEY) {
      return;
    }

    setTodos([...list.add(e.target.value).data]);
    setNewTodo('');
  }
  function handleToggleAll() {
    if (toggleAll) {
      setTodos([...list.uncheckAll().data]);
    } else {
      setTodos([...list.checkAll().data]);
    }
  }
  function handleRemoveCompleted() {
    setTodos([...list.removeChecked().data]);
  }

  const todoItemHandlers = {
    moveItemUp(id) {
      // library list belum bisa
      // setTodos(/* belum ada method di List untuk kasus ini */);
    },
    moveItemDown(id) {
      // library list belum bisa
      // setTodos(/* belum ada method di List untuk kasus ini */);
    },
    removeItem(id) {
      setTodos([...list.remove(id).data]);
    },
    toggleItem(id) {
      setTodos([...list.toggleCheck(id).data]);
    },
    editMode(id) {
      setEditing(id);
    },
    updateItem(id, value) {
      setTodos([...list.edit(id, value).data]);
    },
    addChild(value, id) {
      setTodos([...list.add(value, id).data]);
    },
    expand(id) {
      setTodos([...list.expand(id).data]);
    },
    hide(id) {
      setTodos([...list.contract(id).data]);
    },
  };

  return (
    <div id="todoapp">
      <header id="header">
        <nav>
          <Link to="all">All</Link>
          <Link to="active">Active</Link>
          <Link to="completed">Completed</Link>
        </nav>
        <h1>todo</h1>
        <label htmlFor="new-todo" className="visually-hidden">Add new todo</label>
        <input
          id="new-todo"
          type="text"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={handleNewTodoChange}
          onKeyDown={handleNewTodoKeyDown}
        />
        <div id="how-to">
          Type in the textbox to add a todo.
          <br />
          Double click on a todo to edit.
          <br />
          Hit &quot;Esc&quot; while editing to cancel edit.
        </div>
        <button id="toggle-all-button" type="button" onClick={handleToggleAll}>{toggleAll ? 'uncheck all' : 'check all'}</button>
        <button id="clear-completed" type="button" onClick={handleRemoveCompleted}>clear completed</button>
      </header>
      <Routes>
        <Route
          index
          element={(
            <Navigate to="all" />
          )}
        />
        <Route
          path="all"
          element={(
            <TodoList
              todos={todos}
              todoItemHandlers={todoItemHandlers}
              editing={editing}
            />
          )}
        />
        <Route
          path="active"
          element={(
            <TodoList
              todos={List.getTopUnchecked(list)}
              todoItemHandlers={todoItemHandlers}
              editing={editing}
            />
          )}
        />
        <Route
          path="completed"
          element={(
            <TodoList
              todos={List.getTopChecked(list)}
              todoItemHandlers={todoItemHandlers}
              editing={editing}
            />
          )}
        />
      </Routes>
    </div>
  );
}

export default App;
