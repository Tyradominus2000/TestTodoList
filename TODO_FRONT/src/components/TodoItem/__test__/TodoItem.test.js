import { render, fireEvent, screen, act } from "@testing-library/react";
import TodoItem from "../TodoItem";

//Crée des fausse liste de todo pour le test
const todos = [
  {
    id: 0,
    content: "TEST 1",
    edit: false,
    done: false,
  },
];

const mockUpdateTodo = jest.fn();
const mockDeleteTodo = jest.fn();

//Before EachTest
beforeEach(() => {
  // Render the component with todo id 0
  render(
    <TodoItem
      todo={todos[0]}
      updateTodo={mockUpdateTodo}
      deleteTodo={mockDeleteTodo}
    />
  );
});

// Clear all the mock to free hardware
afterEach(() => {
  jest.clearAllMocks();
});

// Verifie que les elements existe dans le composants
test("Contient elements", () => {
  //get the elements i will use
  const buttonToggle = screen.getByTestId("button-toggleTodo");
  const spanToggle = screen.getByTestId("span-toggleTodo");
  const buttonEdit = screen.getByTestId("button-editTodo");
  //Je verifie si les elements existe
  expect(buttonToggle).toBeDefined();
  expect(spanToggle).toBeDefined();
  expect(buttonEdit).toBeDefined();
});

// Verifie l'état de base du span
test("Etat de base Toggle", () => {
  // get the element i will use
  const spanToggle = screen.getByTestId("span-toggleTodo");
  //Renvoie vrai si le text de span contient strictement le content de todos de 0
  expect(spanToggle.textContent).toStrictEqual(
    expect.stringContaining(todos[0].content)
  );
});

// Verifie l'état de span après click
test("Etat après click Toggle", async () => {
  // get the element i will use
  const buttonToggle = screen.getByTestId("button-toggleTodo");
  const spanToggle = screen.getByTestId("span-toggleTodo");
  await act(async () => {
    // Click sur le button buttonToggle
    fireEvent.click(buttonToggle);
  });
  //Renvoie vrai si le text de span contient strictement le content de todos de 0 et ✔️
  expect(spanToggle.textContent).toStrictEqual(
    expect.stringContaining(todos[0].content, "✔️")
  );
});

// Sould edit
test("Shoul edit", async () => {
  // MocK Response
  const mockResponse = {
    content: "TEST 1",
    done: false,
    edit: true,
  };

  // Create a spyOn function for the fetch
  jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(mockResponse),
  });

  const ButtonEdit = screen.getByTestId("button-editTodo");

  await act(async () => {
    fireEvent.click(ButtonEdit);
  });

  // Expect a call to API
  expect(global.fetch).toHaveBeenCalledWith(
    "http://localhost:8000/modifyTodo",
    expect.objectContaining({
      method: "POST",
      body: JSON.stringify({
        id: 0,
        content: "TEST 1",
        edit: true,
        done: false,
      }),
      headers: { "Content-Type": "application/json" },
    })
  );

  // Expect the mock function to be called with the mockResponse as a parameter
  expect(mockUpdateTodo).toHaveBeenCalledWith(mockResponse);
});

// Sould  not edit
test("Shoul not edit", async () => {
  // Create a spyOn function for the fetch that return not ok response
  jest.spyOn(global, "fetch").mockResolvedValue({
    ok: false,
  });

  const ButtonEdit = screen.getByTestId("button-editTodo");

  await act(async () => {
    fireEvent.click(ButtonEdit);
  });

  // Expect a call to API
  expect(global.fetch).toHaveBeenCalledWith(
    "http://localhost:8000/modifyTodo",
    expect.any(Object)
  );

  // Expect the mock function to be called with the mockResponse as a parameter
  expect(mockUpdateTodo).not.toHaveBeenCalled();
});

// Sould delete
test("Shoul delete", async () => {
  // MocK Response
  const mockResponse = {
    id: 0,
    content: "TEST 1",
    done: false,
    edit: false,
  };

  // Create a spyOn function for the fetch
  jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(mockResponse),
  });

  const ButtonDelete = screen.getByTestId("button-deleteTodo");

  await act(async () => {
    fireEvent.click(ButtonDelete);
  });

  // Expect a call to API
  expect(global.fetch).toHaveBeenCalledWith(
    "http://localhost:8000/deleteTodo",
    expect.objectContaining({
      method: "POST",
      body: JSON.stringify({
        id: 0,
        content: "TEST 1",
        edit: false,
        done: false,
      }),
      headers: { "Content-Type": "application/json" },
    })
  );

  // Expect the mock function to be called with the mockResponse as a parameter
  expect(mockDeleteTodo).toHaveBeenCalledWith(mockResponse);
});
// Sould delte not delete
test("Shoul not delete", async () => {
  // Create a spyOn function for the fetch that return not ok response
  jest.spyOn(global, "fetch").mockResolvedValue({
    ok: false,
  });

  const ButtonDelete = screen.getByTestId("button-deleteTodo");

  await act(async () => {
    fireEvent.click(ButtonDelete);
  });

  // Expect a call to API
  expect(global.fetch).toHaveBeenCalledWith(
    "http://localhost:8000/deleteTodo",
    expect.any(Object)
  );

  // Expect the mock function to be called with the mockResponse as a parameter
  expect(mockDeleteTodo).not.toHaveBeenCalled();
});
