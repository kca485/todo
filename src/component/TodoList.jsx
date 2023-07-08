import TodoItemsContainer from './TodoItemsContainer';
import TodoItem from './TodoItem';

function TodoList({
  todos = [],
  todoItemHandlers,
  editing,
}) {
  const todoItems = todos.map((todo) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      handlers={todoItemHandlers}
      editing={editing}
    />
  ));

  return (
    <main id="main">
      <TodoItemsContainer>
        {todoItems}
      </TodoItemsContainer>
    </main>
  );
}

export default TodoList;
