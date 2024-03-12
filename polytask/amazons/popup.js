let latestClickTime = null;

document.addEventListener("DOMContentLoaded", async function () {
  var scrapeButton = document.getElementById("scrapeBtn");

  scrapeButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "scrape" });
    });
  });

  chrome.runtime.onMessage.addListener(function (request) {
    if (request.action === "productData") {
      const scrapeLimit = 10;
      const scrapeCount = localStorage.getItem("scrapeCount");

      if (scrapeCount && scrapeCount >= scrapeLimit) {
        hideScrapeButton();
        createResetButton();
        alert("Scrape limit reached. Please reset your limit.");
      } else if (scrapeCount) {
        localStorage.setItem("scrapeCount", parseInt(scrapeCount) + 1);
        checkTimeBeforeScraping(request.data);
      } else {
        localStorage.setItem("scrapeCount", 1);
      }
    }
  });
});

function createAndAppendElement(tag, parent, content, attributes) {
  var element = document.createElement(tag);

  if (content) {
    element.innerHTML = content;
  }

  if (attributes) {
    for (var key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

  parent.appendChild(element);
  return element;
}

function checkTimeBeforeScraping(productData) {
  if (latestClickTime && Date.now() - latestClickTime < 3000) {
    alert("Please wait for 3 seconds before scraping again.");
  } else {
    populateProductUI(productData);
  }
}

function populateProductUI(productData) {
  latestClickTime = Date.now();
  var productContainer = document.getElementById("productContainer");

  productContainer.innerHTML = "";

  // Display product image
  createImageElement(productData.product.img, productContainer);

  // Display product title
  createTitleElement(productData.product.title, productContainer);

  // Display product price
  createParagraph("Price", productContainer, productData.product.price);

  // Display product rating
  createParagraph(
    "Rating",
    productContainer,
    productData.product.platform_rating
  );

  // Display seller information
  createParagraph("Seller", productContainer, productData.product.seller.name);

  // Display reviews title
  createH3Element("Reviews", productContainer, {
    class: "reviews-count",
  });

  //Display reviews count
  createParagraph(
    "Reviews Count",
    productContainer,
    productData.product.reviews_count,
    {
      class: "reviews-count",
    }
  );

  // Create a container for reviews
  createDivElement("", productContainer, {
    class: "reviews-container",
  });

  // Display individual reviews
  for (var i = 0; i < productData.reviews.length; i++) {
    var review = productData.reviews[i];
    var reviewContainer = createAndAppendElement(
      "div",
      document.getElementsByClassName("reviews-container")[0],
      "",
      {
        class: "review",
      }
    );

    // Display reviewer name
    createParagraph("Reviewer", reviewContainer, review.author.full_name);

    // Display review text
    createParagraph("Review", reviewContainer, review.review);

    // Display recommendation
    createParagraph(
      "Recommendation",
      reviewContainer,
      review.is_recommended ? "Yes" : "No"
    );

    // Display platform rating
    createParagraph("Rating", reviewContainer, review.platform_rating);
  }
}

function createDivElement(title, container, args) {
  createAndAppendElement("div", container, title, args);
}

function createH3Element(title, container, args) {
  createAndAppendElement("h3", container, title, args);
}

function createParagraph(title, container, value, args) {
  createAndAppendElement("p", container, `<b>${title}: </b>` + value, args);
}

function createTitleElement(title, container) {
  createAndAppendElement("h2", container, title, {
    class: "product-title",
  });
}

function createImageElement(src, container) {
  createAndAppendElement("img", container, "", {
    src,
    class: "product-image",
  });
}

function createResetButton() {
  const actionButtons = document.getElementById("actions");
  const resetLimitButton = document.createElement("button");
  resetLimitButton.classList.add("reset-limit-btn");
  resetLimitButton.textContent = "Reset limit";
  resetLimitButton.addEventListener("click", function () {
    removeScrapeLimitFromStorage();
    resetLimitButton.style.display = "none";
    showScrapeButton();
  });
  actionButtons?.append(resetLimitButton);
}

function removeScrapeLimitFromStorage() {
  localStorage.removeItem("scrapeCount");
}

function showScrapeButton() {
  var scrapeButton = document.getElementById("scrapeBtn");
  scrapeButton.style.display = "block";
}

function hideScrapeButton() {
  var scrapeButton = document.getElementById("scrapeBtn");
  scrapeButton.style.display = "none";
}

module.exports = {
  createAndAppendElement,
  createResetButton,
  removeScrapeLimitFromStorage,
  showScrapeButton,
};
