describe("Testing App with AddTodo", () => {
  // Visit the url
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  // Test to add a todo
  it("Adding Todo", () => {
    const MockText = "Test 1";

    // Select Input -> focus it -> clear the input -> Write the MockText -> Blur it
    cy.get('input[placeholder="Add a todo"]')
      .focus()
      .clear()
      .type(MockText)
      .blur();
    // Click on the Add button
    cy.contains("Add").click();
    // Verify if the Todo is added
    cy.get("ul > li").should("have.length", 1);
  });
  it("Not Adding Todo", () => {
    // Select Input -> focus it -> clear the input -> Write the MockText -> Blur it
    cy.get('input[placeholder="Add a todo"]').focus().clear().blur();
    // Click on the Add button
    cy.contains("Add").click();

    // Verify if the Todo is not added
    cy.get("ul > li").should("have.length", 4);
  });
});
