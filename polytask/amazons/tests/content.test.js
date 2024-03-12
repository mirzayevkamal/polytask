const { getProductSeller } = require("../content.js");
const chrome = require('sinon-chrome/extensions');

test("getProductSeller returns default value when element not found", () => {
  const mockDocument = {
    querySelector: jest.fn().mockReturnValue(null),
  };

  global.document = mockDocument;

  const sellerName = getProductSeller();

  global.document = window.document;

  // Assert that the default value is returned
  expect(sellerName).toBe("-");
});
