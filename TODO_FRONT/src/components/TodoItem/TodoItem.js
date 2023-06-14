// eslint-disable-next-line
import styles from "./TodoItem.module.scss";

export default function TodoItem({ todo, deleteTodo, updateTodo }) {
  async function modifyTodo(newTodo) {
    try {
      const response = await fetch("http://localhost:8000/modifyTodo", {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const newTodo = await response.json();
        console.log({ newTodo });
        updateTodo(newTodo);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteTodo(deletedTodo) {
    try {
      const response = await fetch("http://localhost:8000/deleteTodo", {
        method: "POST",
        body: JSON.stringify(deletedTodo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        deleteTodo(deletedTodo);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <li className="d-flex justify-content-center align-items-center p10 mb10">
      <span data-testid="span-toggleTodo" className="flex-fill mr10">
        {todo.content} {todo.done && "✔️"}
      </span>
      <div>
        <button
          data-testid="button-toggleTodo"
          onClick={(e) => {
            e.stopPropagation();
            modifyTodo({ ...todo, done: !todo.done });
          }}
          className="btn btn-primary mr10"
        >
          {todo.done ? "Réalisé" : "A faire"}
        </button>
        <button
          data-testid="button-editTodo"
          onClick={(e) => {
            e.stopPropagation();
            modifyTodo({ ...todo, edit: !todo.edit });
          }}
          className="btn btn-primary mr10"
        >
          Modifier
        </button>
        <button
          data-testid="button-deleteTodo"
          onClick={() => handleDeleteTodo(todo)}
          className="btn btn-primary-reverse mr10"
        >
          Supprimer
        </button>
      </div>
    </li>
  );
}
