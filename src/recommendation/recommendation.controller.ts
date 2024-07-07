import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { JwtGuard } from '../jwt/jwt.guard';
import { UserId } from '../user-id/user-id.decorator';
import OKResponse from '../../utilities/OKResponse';

@UseGuards(JwtGuard)
@Controller()
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get('/for-you')
  async getForYouRecommendations(@UserId() user_id: number) {
    try {
      const data =
        await this.recommendationService.getForYouRecommendations(user_id);
      return new OKResponse(
        data,
        'For you recommendations fetched successfully',
      );
    } catch (e) {
      console.log('SOMETHING WENT WRONG BRUH');
      throw new InternalServerErrorException(
        'Error while fetching recommendations. Please try again later',
      );
    }
  }

  @Get('/similar/:id')
  async findSimilarProducts(@Param('id') id: string) {
    try {
      const data = await this.recommendationService.getSimilarProducts(+id);

      return new OKResponse(data, 'Similar products fetched successfully');
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(
        'Error while fetching similar products. Please try again later',
      );
    }
  }

  @Get('/query')
  async getQueryLLM(@Query('query') query: string) {
    try {
      const data = await this.recommendationService.queryLLM(query);

      return new OKResponse(data, 'Queries fetched successfully');
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(
        'Error while fetching queries. Please try again later',
      );
    }
  }
}
