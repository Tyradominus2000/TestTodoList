describe("Testing App with AddTodo", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Adding Component", () => {
    const MockText = "Test";

    // Select Input -> focus it -> clear the input -> Write the MockText -> Blur it
    cy.get('input[placeholder="Add a todo"]')
      .focus()
      .clear()
      .type(MockText)
      .blur();
    // Click on the Add button
    cy.contains("Add").click();

    // Verify if the Todo is added
    cy.contains(MockText);
  });
});

