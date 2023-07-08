import { useState, useEffect, useRef } from "react";
import TodoItemsContainer from "./TodoItemsContainer";

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

function TodoItem({ todo, handlers, editing }) {
  const [editText, setEditText] = useState(todo.value);
  const textInput = useRef(null);

  useEffect(() => {
    if (editing === todo.id) textInput.current.focus();
  }, [editing, todo.id]);

  function moveItemUp() {
    handlers.moveItemUp(todo.id);
  }
  function moveItemDown() {
    handlers.moveItemDown(todo.id);
  }
  function removeItem() {
    handlers.removeItem(todo.id);
  }
  function toggleItem() {
    handlers.toggleItem(todo.id);
  }
  function enterEditMode() {
    handlers.editMode(todo.id);
  }
  function textInputChange(e) {
    setEditText(e.target.value);
  }
  function textInputUpdate(e) {
    if (!e.target.value) {
      handlers.removeItem(todo.id);
    } else {
      handlers.updateItem(todo.id, e.target.value);
    }
    handlers.editMode("");
  }
  function textInputKeyDown(e) {
    if (e.keyCode === ENTER_KEY) {
      textInputUpdate(e);
    }
    if (e.keyCode === ESCAPE_KEY) {
      setEditText(todo.value);
      handlers.editMode("");
    }
  }
  function addChild() {
    handlers.addChild("", todo.id);

    const { children } = todo;
    const child = children[children.length - 1];
    handlers.editMode(child.id);
  }
  function expand() {
    handlers.expand(todo.id);
  }
  function hide() {
    handlers.hide(todo.id);
  }

  const expandButton = (
    <button type="button" className="expand" onClick={expand}>
      expand
    </button>
  );
  const hideButton = (
    <button type="button" className="hide" onClick={hide}>
      hide
    </button>
  );
  const hasChildren = Boolean(todo.children.length);
  const childrenList = todo.children.map((child) => (
    <TodoItem
      key={child.id}
      todo={child}
      handlers={handlers}
      editing={editing}
    />
  ));

  const isEditing = editing === todo.id;
  return (
    <li data-id={todo.id} className={isEditing ? "editing" : ""}>
      <div className="view">
        <input
          id={`toggle-completed-${todo.id}`}
          type="checkbox"
          className="toggle"
          checked={todo.checked}
          onChange={toggleItem}
        />
        <label
          htmlFor={`toggle-completed-${todo.id}`}
          className="visually-hidden"
        >
          Add new todo
        </label>
        <span>
          <button type="button" className="move-up" onClick={moveItemUp}>
            {"\u2191"}
          </button>
          <button type="button" className="move-down" onClick={moveItemDown}>
            {"\u2193"}
          </button>
        </span>
        <button type="button" className="destroy" onClick={removeItem}>
          clear
        </button>
        <button type="button" className="add-child" onClick={addChild}>
          add child
        </button>
        <button type="button" className="edit-btn" onClick={enterEditMode}>
          edit
        </button>
        {hasChildren && (todo.expanded ? hideButton : expandButton)}
        {isEditing ? (
          <>
            <input
              id={`edit-${todo.id}`}
              type="text"
              value={editText}
              ref={textInput}
              className="edit"
              onChange={textInputChange}
              onBlur={textInputUpdate}
              onKeyDown={textInputKeyDown}
            />
            <label htmlFor={`edit-${todo.id}`} className="visually-hidden">
              {todo.value}
            </label>
          </>
        ) : (
          <div className={`value${todo.checked ? " completed" : ""}`}>
            {todo.value}
          </div>
        )}
      </div>
      {hasChildren && todo.expanded && (
        <TodoItemsContainer>{childrenList}</TodoItemsContainer>
      )}
    </li>
  );
}

export default TodoItem;
