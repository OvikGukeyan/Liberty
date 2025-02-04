import ReviewService from "../service/reviewsService.js";


class ReviewController {
  async getReviews(req, res, next) {
    try {
      const { reviews } = await ReviewService.getReviews();
      return res.json(reviews);
    } catch (error) {
      console.error("Error retrieving reviews:", error);
      next(error);
    }
  }
}

export default new ReviewController();
