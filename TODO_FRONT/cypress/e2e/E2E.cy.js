describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  // Should add a Todo if fiel have content
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
    cy.get("ul > li > span").contains(MockText);
  });

  // Sould not add todo if field is empty
  it("Not Adding Todo", () => {
    const MockText = "Test 2";

    // Select Input -> focus it -> clear the input -> Blur it
    cy.get('input[placeholder="Add a todo"]').focus().clear().blur();
    // Click on the Add button
    cy.contains("Add").click();

    // Verify if the Todo is added
    cy.get("ul > li > span").contains(MockText).should("not.exist");
  });

  // Should modifie 4 todo
  it("Should modify", () => {
    const MockText = "Test 1 Modifier";
    // Get the 4 button edit and click it
    cy.get("ul > li > div > button[data-testid=button-editTodo]").eq(3).click();
    // Input MockText in the input
    cy.get('input[value="Test 1"]').focus().clear().type(MockText).blur();
    // CLick on the save button
    cy.get("ul > div > button[data-testid=button-saveTodo").click();
    // Verify if the value as been modified
    cy.get("ul > li > span").contains(MockText);
  });

  // Delete the 4 todo
  it("Sould Delete", () => {
    // Click on the delete button of the 4 todo
    cy.get("ul > li > div > button[data-testid=button-deleteTodo]")
      .eq(3)
      .click();
    // Verify that their is only 3 element in the list so the 4 todo has been delete
    cy.get("ul[data-testid=ul] > li").should("have.length", 3);
  });
});
