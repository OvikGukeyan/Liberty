import { getJson } from "serpapi";

let cachedReviews = null;
let lastCacheTime = 0;

class ReviewService {
  async getReviews() {
    const API_KEY = process.env.SERPAPI_API_KEY;
    const PLACE_ID = process.env.PLACE_ID;

    const ONE_DAY = 24 * 60 * 60 * 1000;

    if (cachedReviews && Date.now() - lastCacheTime < ONE_DAY) {
      console.log("Returning cached reviews.");
      return cachedReviews;
    }

    const params = {
      engine: "google_maps_reviews",
      api_key: API_KEY,
      place_id: PLACE_ID,
      hl: "en",
      sort_by: "qualityScore",
    };

    const data = await getJson(params);

    if (data.error) {
      return data.error
    }

    cachedReviews = data;
    lastCacheTime = Date.now();

    return data;
  }
}

export default new ReviewService();
