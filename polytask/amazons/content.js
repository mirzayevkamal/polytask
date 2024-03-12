chrome.runtime?.onMessage.addListener(function (request) {
  if (request.action === "scrape") {
    if (
      window.location.host.includes("www.amazon.com") &&
      window.location.href.includes("/dp/")
    ) {
      scrapeDataAndPopulate();
    } else {
      alert("Please navigate to an Amazon product page to scrape.");
    }
  }
});

function scrapeDataAndPopulate() {
  const productData = {
    product: {
      in_platform_id: "-",
      title: "-",
      platform_rating: "-",
      img: "-",
      reviews_count: "-",
      price: "-",
      seller: {
        in_platform_id: "-",
        name: "-",
        profile_url: "-",
        platform: {
          name: "amazon",
          url: "https://www.amazon.com",
        },
      },
      url: "-",
    },
    reviews: [
      {
        in_platform_id: "-",
        review: "-",
        is_recommended: "-",
        platform_rating: "-",
        author: {
          in_platform_id: "-",
          full_name: "-",
          profile_url: "-",
        },
      },
    ],
  };

  productData.product.title = getProductTitle();
  productData.product.platform_rating = getProductRating();
  productData.product.img = getProductImg();
  productData.product.price = getProductPrice();
  productData.product.reviews_count = getProductReviewCount();
  productData.product.seller.name = getProductSeller();
  productData.product.seller.profile_url = getProductSellerProfileUrl();
  productData.product.seller.in_platform_id = getProductSellerId();
  productData.product.url = window.location.href;
  productData.product.in_platform_id = getProductASIN();
  productData.reviews = getReviews();

  console.table(productData.product);
  console.table(productData.reviews);
  console.info(productData);

  chrome.runtime.sendMessage({
    action: "productData",
    data: productData,
  });
}

function getProductTitle() {
  return document.getElementById("productTitle")?.innerText || "-";
}

function getProductRating() {
  return document.getElementById("acrPopover")?.innerText.split(" ")[0] || "-";
}

function getProductImg() {
  return document.getElementById("landingImage")?.src || "-";
}

function getProductPrice() {
  return (
    document.querySelector("#corePrice_feature_div .a-offscreen")?.innerText ||
    "-"
  );
}

function getProductReviewCount() {
  return (
    document
      .getElementById("acrCustomerReviewText")
      ?.innerText?.split(" ")[0] || "-"
  );
}

function getProductSeller() {
  return (
    document
      .querySelector("#bylineInfo")
      ?.innerText?.replace("Visit the ", "") || "-"
  );
}

function getProductSellerProfileUrl() {
  return (
    document.querySelector("#postsSameBrandCard_feature_div .a-link-normal img")
      ?.src || ""
  );
}

function getProductSellerId() {
  return (
    document
      .querySelector("#bylineInfo")
      .getAttribute("data-csa-c-content-id") || "-"
  );
}

function getProductASIN() {
  return window.location.href.split("dp/")[1]?.split("/")[0] || "-";
}

//review methods
function getCustomerReviewText(item) {
  return item.getElementsByClassName("review-text")[0]?.innerText || "-";
}

function getCustomerReviewAuthorURI(item) {
  return item.getElementsByClassName("a-profile")[0]?.href || "-";
}

function getCustomerAuthor(item) {
  return item.getElementsByClassName("a-profile-name")[0]?.innerText || "-";
}

function getCustomerReviewRating(item) {
  const rating =
    item.getElementsByClassName("review-rating")[0].querySelector("span")
      ?.innerText || "-";

  return parseInt(rating);
}

function getReviewNodes() {
  return document.querySelectorAll(".review");
}

function getReviews() {
  const reviews = [];
  //
  const reviewNodes = getReviewNodes();
  for (const reviewNode of reviewNodes) {
    const review = {
      in_platform_id: reviewNode.getAttribute("id"),
      review: getCustomerReviewText(reviewNode),
      is_recommended: getCustomerReviewRating(reviewNode) > 3,
      platform_rating: getCustomerReviewRating(reviewNode),
      author: {
        in_platform_id: getCustomerReviewAuthorURI(reviewNode),
        full_name: getCustomerAuthor(reviewNode),
        profile_url: getCustomerReviewAuthorURI(reviewNode),
      },
    };
    reviews.push(review);
  }

  return reviews;
}

module.exports = {
  getProductSeller,
};
