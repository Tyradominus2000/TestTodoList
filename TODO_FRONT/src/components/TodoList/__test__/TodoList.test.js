import { render, fireEvent, screen, act } from "@testing-library/react";
import TodoList from "../TodoList";

const mockTodo = [
  {
    id: 0,
    content: "Test 1",
    edit: false,
    done: false,
  },
  {
    id: 1,
    content: "Test 2",
    edit: false,
    done: false,
  },
  {
    id: 2,
    content: "Test 3",
    edit: false,
    done: false,
  },
];

const mockTodoEmpty = [];

test("Expect TodoList if there is a todo", () => {
  render(<TodoList todoList={mockTodo} />);

  expect(screen.getByText("Test 1")).toBeInTheDocument();
  expect(screen.getByText("Test 2")).toBeInTheDocument();
  expect(screen.getByText("Test 3")).toBeInTheDocument();
});

test("Expect not a TodoList if there is no todo", () => {
  render(<TodoList todoList={mockTodoEmpty} />);

  expect(screen.getByText("Aucune todo pour le moment")).toBeInTheDocument();

});
