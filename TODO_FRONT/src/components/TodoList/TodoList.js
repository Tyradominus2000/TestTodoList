import TodoItem from "../TodoItem/TodoItem";
import EditTodo from "../EditTodo/EditTodo";

export default function TodoList({ todoList, deleteTodo, updateTodo }) {
  return todoList.length ? (
    <ul data-cy="Todo">
      {todoList.map((t) =>
        t.edit ? (
          <EditTodo key={t.id} todo={t} updateTodo={updateTodo} />
        ) : (
          <TodoItem
            key={t.id}
            todo={t}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        )
      )}
    </ul>
  ) : (
    <>
      <p data-cy="noTodo">Aucune todo pour le moment</p>
    </>
  );
}
