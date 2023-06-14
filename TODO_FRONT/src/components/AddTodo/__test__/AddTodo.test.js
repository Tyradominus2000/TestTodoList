import { render, fireEvent, screen, act } from "@testing-library/react";
import AddTodo from "../AddTodo";

// Create a mock function of addTodo
const addTodoMock = jest.fn();

beforeEach(() => {
  // On each test render the AddTodo component giving it the mock function as a prop
  render(<AddTodo addTodo={addTodoMock} />);
});

// Test if all the needed elements are in the component
test("Element are here", () => {
  const ButtonAdd = screen.getByText("Add");
  const Input = screen.getByPlaceholderText("Add a todo");

  expect(ButtonAdd).toBeDefined();
  expect(Input).toBeDefined();
});

// if there is no value in the input addTodo should not be fire
test("Should no add todo if input is empty", () => {
  const ButtonAdd = screen.getByText("Add");
  //   Click the button
  fireEvent.click(ButtonAdd);

  expect(addTodoMock).not.toHaveBeenCalled();
});

// Sould add a todo if input have correct information
test("should add a todo", async () => {
  // Mock response
  const mockResponse = {
    content: "Test Todo",
    done: false,
    edit: false,
  };

  // Create a spyOn function for the fetch
  jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(mockResponse),
  });

  // Get all the element needed
  const input = screen.getByPlaceholderText("Add a todo");
  const addButton = screen.getByText("Add");

  // Await that the component re-render with change done
  await act(async () => {
    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.click(addButton);
  });

  // When the fetch mock function is called With the value expected
  expect(global.fetch).toHaveBeenCalledWith(
    "http://localhost:8000/addTodo",
    expect.objectContaining({
      method: "POST",
      body: JSON.stringify({
        content: "Test Todo",
        done: false,
        edit: false,
      }),
    })
  );

  // Expect addTodo to have been calle with the mock response as parameter
  expect(addTodoMock).toHaveBeenCalledWith(mockResponse);
});

// Test that if response is not Ok should not fire addTodo and display error
test("should handle error during todo addition", async () => {
  // Create a spyOn function for the fetch
  jest.spyOn(global, "fetch").mockResolvedValue({
    ok: false,
  });

  // Get all the element needed
  const input = screen.getByPlaceholderText("Add a todo");
  const addButton = screen.getByText("Add");

  // Await that the component re-render with change done
  await act(async () => {
    fireEvent.change(input, { target: { value: "Test Todo" } });
    fireEvent.click(addButton);
  });

  // Attend une reponse de fetch d'un objet
  expect(global.fetch).toHaveBeenCalledWith(
    "http://localhost:8000/addTodo",
    expect.any(Object)
  );
  // Because reponse is not ok expect an error
  expect(addTodoMock).not.toHaveBeenCalled();
  // Expect display of error in the component
  expect(screen.getByText("Une erreur est survenue")).toBeInTheDocument();
});

// Clear all the mock to not have memory leak
afterEach(() => {
  jest.clearAllMocks();
});
