import XRaySDK from "../sdk/XRaySDK";

const mockProducts = [
  { asin: "B0COMP01", title: "HydroFlask 32oz Wide Mouth", price: 44.99, rating: 4.5, reviews: 8932 },
  { asin: "B0COMP02", title: "Yeti Rambler 26oz", price: 34.99, rating: 4.4, reviews: 5621 },
  { asin: "B0COMP03", title: "Generic Water Bottle", price: 8.99, rating: 3.2, reviews: 45 },
  { asin: "B0COMP04", title: "Bottle Cleaning Brush Set", price: 12.99, rating: 4.6, reviews: 3421 },
  { asin: "B0COMP05", title: "Replacement Lid for HydroFlask", price: 9.99, rating: 4.3, reviews: 892 },
  { asin: "B0COMP06", title: "Water Bottle Carrier Bag", price: 15.99, rating: 4.1, reviews: 234 },
  { asin: "B0COMP07", title: "Stanley Adventure Quencher 30oz", price: 35.0, rating: 4.3, reviews: 4102 },
  { asin: "B0COMP08", title: "Contigo AutoSeal 24oz", price: 22.99, rating: 4.2, reviews: 2847 }
];

function runCompetitorSelectionDemo() {
  const xray = new XRaySDK();

  const referenceProduct = {
    asin: "B0XYZ123",
    title: "ProBrand Steel Bottle 32oz Insulated",
    price: 29.99,
    rating: 4.2,
    reviews: 1247,
    category: "Sports & Outdoors > Water Bottles"
  };

  xray.recordStep({
    step: "keyword_generation",
    type: "llm",
    input: referenceProduct,
    output: {
      keywords: ["stainless steel water bottle insulated", "vacuum insulated bottle 32oz"],
      model: "gpt-4"
    },
    reasoning: "Extracted material, size, and insulation features"
  });

  xray.recordStep({
    step: "candidate_search",
    type: "api",
    input: { keyword: "stainless steel water bottle insulated", limit: 50 },
    output: {
      total_results: 2847,
      candidates_fetched: mockProducts.length,
      candidates: mockProducts
    },
    // reasoning: "Fetched top relevant results"
    reasoning: `Fetched top ${mockProducts.length} results by relevance; 2847 total matches found`
  });


  const priceMin = referenceProduct.price * 0.5;
  const priceMax = referenceProduct.price * 2;
  const minRating = 3.8;
  const minReviews = 100;

  const evaluations = mockProducts.map(product => {
    const pricePass = product.price >= priceMin && product.price <= priceMax;
    const ratingPass = product.rating >= minRating;
    const reviewsPass = product.reviews >= minReviews;

    return {
      ...product,
      filter_results: {
        price_range: {
          passed: pricePass,
          detail: pricePass 
            ? `$${product.price.toFixed(2)} is within $${priceMin.toFixed(2)}-$${priceMax.toFixed(2)}`
            : `$${product.price.toFixed(2)} is ${product.price < priceMin ? 'below minimum' : 'above maximum'} ($${priceMin.toFixed(2)}-$${priceMax.toFixed(2)})`
        },
        min_rating: {
          passed: ratingPass,
          detail: ratingPass ? `${product.rating} >= ${minRating}` : `${product.rating} < ${minRating} threshold`
        },
        min_reviews: {
          passed: reviewsPass,
          detail: reviewsPass ? `${product.reviews} >= ${minReviews}` : `${product.reviews} < ${minReviews} minimum`
        }
      },
      qualified: pricePass && ratingPass && reviewsPass
    };
  });

  const qualified = evaluations.filter(e => e.qualified);

  xray.recordStep({
    step: "apply_filters",
    type: "filter",
    input: {
      candidates_count: mockProducts.length,
      reference_product: referenceProduct
    },
    filters_applied: {
      price_range: { min: priceMin, max: priceMax, rule: "0.5x - 2x of reference price" },
      min_rating: { value: minRating, rule: "Must be at least 3.8 stars" },
      min_reviews: { value: minReviews, rule: "Must have at least 100 reviews" }
    },
    evaluations: evaluations,
    output: {
      total_evaluated: mockProducts.length,
      passed: qualified.length,
      failed: mockProducts.length - qualified.length
    },
    reasoning: `Applied price, rating, and review count filters to narrow candidates from ${mockProducts.length} to ${qualified.length}`
  });

  // Step 4: Rank & Select
  const ranked = qualified
    .map(product => {
      const reviewScore = product.reviews / 10000;
      const ratingScore = product.rating / 5;
      const priceDiff = Math.abs(product.price - referenceProduct.price);
      const priceScore = 1 - (priceDiff / referenceProduct.price);
      const totalScore = (reviewScore * 0.5) + (ratingScore * 0.3) + (priceScore * 0.2);

      return {
        ...product,
        score_breakdown: {
          review_count_score: reviewScore,
          rating_score: ratingScore,
          price_proximity_score: priceScore
        },
        total_score: totalScore
      };
    })
    .sort((a, b) => b.total_score - a.total_score);

  const selected = ranked[0];

  xray.recordStep({
    step: "rank_and_select",
    type: "ranking",
    input: {
      candidates_count: qualified.length,
      reference_product: referenceProduct
    },
    ranking_criteria: {
      primary: "review_count",
      secondary: "rating",
      tertiary: "price_proximity"
    },
    ranked_candidates: ranked.slice(0, 3).map((p, i) => ({
      rank: i + 1,
      asin: p.asin,
      title: p.title,
      metrics: { price: p.price, rating: p.rating, reviews: p.reviews },
      score_breakdown: p.score_breakdown,
      total_score: p.total_score
    })),
    selection: {
      asin: selected.asin,
      title: selected.title,
      reason: `Highest overall score (${selected.total_score.toFixed(2)}) - top review count (${selected.reviews}) with strong rating (${selected.rating}★)`
    },
    output: {
      selected_competitor: {
        asin: selected.asin,
        title: selected.title,
        price: selected.price,
        rating: selected.rating,
        reviews: selected.reviews
      }
    }
  });

  return xray.finalize();
}


export default runCompetitorSelectionDemo;
