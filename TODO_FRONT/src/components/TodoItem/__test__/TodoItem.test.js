import { render, fireEvent, screen } from "@testing-library/react";
import TodoItem from "../TodoItem";

//Crée des fausse liste de todo pour le test
const todos = [
  {
    id: 0,
    content: "TEST 1",
    edit: false,
    done: false,
  },
  {
    id: 1,
    content: "TEST 2",
    edit: true,
    done: false,
  },
  {
    id: 2,
    content: "TEST 3",
    edit: false,
    done: true,
  },
  {
    id: 3,
    content: "TEST 4",
    edit: true,
    done: true,
  },
];
let buttonToggle;
let spanToggle;
let buttonEdit;

//Before EachTest
beforeEach(() => {
  // Render the component with todo id 0
  render(<TodoItem todo={todos[0]} />);
  //get the elements i will use
  buttonToggle = screen.getByTestId("button-toggleTodo");
  spanToggle = screen.getByTestId("span-toggleTodo");
  buttonEdit = screen.getByTestId("button-editTodo");
});

// Verifie que les elements existe dans le composants
test("Contient elements", () => {
  //Je verifie si les elements existe
  expect(buttonToggle).toBeDefined();
  expect(spanToggle).toBeDefined();
  expect(buttonEdit).toBeDefined();
});


// Verifie l'état de base du span
test("Etat de base Toggle", () => {
  //Renvoie vrai si le text de span contient strictement le content de todos de 0
  expect(spanToggle.textContent).toStrictEqual(
    expect.stringContaining(todos[0].content)
  );
});


// Verifie l'état de span après click
test("Etat après click Toggle", () => {
  // Click sur le button buttonToggle
  fireEvent.click(buttonToggle);
    //Renvoie vrai si le text de span contient strictement le content de todos de 0 et ✔️
  expect(spanToggle.textContent).toStrictEqual(
    expect.stringContaining(todos[0].content, "✔️")
  );
});
