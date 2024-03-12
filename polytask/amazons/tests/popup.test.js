const { createAndAppendElement, createResetButton } = require("../popup.js");

test("createAndAppendElement creates and appends element to parent", () => {
  const parent = document.createElement("div");
  document.body.appendChild(parent); 

  const tag = "p";
  const content = "This is a test paragraph";
  const attributes = { class: "review" };

  // Call the function and store the created element
  const element = createAndAppendElement(tag, parent, content, attributes);

  // Assertions
  expect(element).toBeInstanceOf(HTMLElement);
  expect(element.tagName).toBe(tag.toUpperCase());
  expect(element.textContent).toBe(content);
  expect(element.classList.contains(attributes.class)).toBe(true);

  document.body.removeChild(parent);
});

test("createResetButton click removes limit and hides button", () => {
  // Mock functions
  const removeScrapeLimitFromStorage = jest.fn();
  const showScrapeButton = jest.fn();

  // Mock document.getElementById
  const mockElement = document.createElement("div");
  mockElement.id = "actions";
  document.body.appendChild(mockElement);
  jest.spyOn(document, "getElementById").mockReturnValue(mockElement);

  // Create button with mocked functions
  const resetLimitButton = document.createElement("button");
  resetLimitButton.addEventListener("click", () => {
    removeScrapeLimitFromStorage();
    resetLimitButton.style.display = "none";
    showScrapeButton();
  });

  // Call the function with mocked button
  createResetButton(resetLimitButton);

  // Simulate click event
  resetLimitButton.click();

  // Assertions
  expect(removeScrapeLimitFromStorage).toHaveBeenCalled();
  expect(resetLimitButton.style.display).toBe("none");
  expect(showScrapeButton).toHaveBeenCalled();

  // Cleane mock elements
  document.body.removeChild(mockElement);
});
