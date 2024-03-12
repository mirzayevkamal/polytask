export const sampleProductData = {
  product: {
    in_platform_id: "123456789",
    title: "Sample Product",
    platform_rating: "4.5",
    img: "https://via.placeholder.com/150",
    reviews_count: "100",
    price: "$10.99",
    seller: {
      in_platform_id: "123456789",
      name: "Sample Seller",
      profile_url: "https://example.com",
      platform: {
        name: "amazon",
        url: "https://www.amazon.com",
      },
    },
    url: "https://example.com",
  },
  reviews: [
    {
      in_platform_id: "123456789",
      review: "Sample Review",
      is_recommended: true,
      platform_rating: "4.5",
      author: {
        in_platform_id: "123456789",
        full_name: "Sample Author",
        profile_url: "https://example.com",
      },
    },
  ],
};
