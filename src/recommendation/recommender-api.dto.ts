interface RecommenderApiResponse {
  message: string;
  response: number[] | string[];
}

interface RecommenderApiQueryResponse {
  message: string;
  productIds: string[];
}
