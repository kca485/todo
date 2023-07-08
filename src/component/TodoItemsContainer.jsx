function TodoItemsContainer({ children }) {
  return (
    <ul className="todo-list">
      {children}
    </ul>
  );
}

export default TodoItemsContainer;
