import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ProductsService } from '../products/products.service';

@Injectable()
export class RecommendationService {
  constructor(private productService: ProductsService) {}

  async getForYouRecommendations(user_id: number) {
    const res = await axios.get<RecommenderApiResponse>(
      `${process.env.RECOMMENDER_API_URL}/api/v1/recommend`,
      {
        params: { userId: user_id },
      },
    );

    const productIds = res.data.response.map((productId) =>
      parseInt(productId),
    );

    return this.productService.findFromProductIds(productIds) || [];
  }

  async getSimilarProducts(product_id: number) {
    const res = await axios.get<RecommenderApiResponse>(
      `${process.env.RECOMMENDER_API_URL}/api/v1/recommend-similar-product`,
      {
        params: { productId: product_id },
      },
    );

    const productIds = res.data.response.map((productId) =>
      parseInt(productId),
    );

    return this.productService.findFromProductIds(productIds) || [];
  }

  /**
   * Query the LLM model (e.g. "I want a smart watch")
   * @param query
   */
  async queryLLM(query: string) {
    const res = await axios.get<RecommenderApiQueryResponse>(
      `${process.env.RECOMMENDER_API_URL}/api/v1/query`,
      {
        params: { query: query },
      },
    );

    const productIds = res.data.productIds.map((productId) =>
      parseInt(productId),
    );

    return this.productService.findFromProductIds(productIds) || [];
  }
}
