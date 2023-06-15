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

    // Select Input -> focus it -> clear the input -> Write the MockText -> Blur it
    cy.get('input[placeholder="Add a todo"]').focus().clear().blur();
    // Click on the Add button
    cy.contains("Add").click();

    // Verify if the Todo is added
    cy.get("ul > li > span").contains(MockText).should("not.exist");
  });

  // Should modifie 4 todo
  it("Should modify", () => {
    const MockText = "Test 1 Modifier";

    cy.get("ul > li > div > button[data-testid=button-editTodo]").eq(3).click();
    cy.get('input[value="Test 1"]').focus().clear().type(MockText).blur();
    cy.get("ul > div > button[data-testid=button-saveTodo").click();
    cy.get("ul > li > span").contains(MockText);
  });

  it("Sould Delete", () => {
    cy.get("ul > li > div > button[data-testid=button-deleteTodo]")
      .eq(3)
      .click();
    cy.get("ul[data-testid=ul] > li").should("have.length", 3);
  });
});
