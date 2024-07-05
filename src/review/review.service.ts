import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {

  constructor(private prisma: PrismaService) {}

  async createReview(user_id: number, product_id: number, createReviewDto: CreateReviewDto) {
    // Check if the user can leave a review by checking their purchase items
    const hasPurchased = await this.prisma.purchase.findFirst({
      where: {
        user_id,
        PurchaseItem: {
          some: {
            product_id
          }
        }
      }
    })

    // Check if the user already left a review
    const hasReviewed = await this.prisma.reviews.findFirst({
      where: {
        user_id,
        product_id
      }
    })

    if(!hasPurchased){
      throw new BadRequestException('You cannot leave a review for a product you have not purchased')
    }

    if(hasReviewed){
      throw new BadRequestException('You have already left a review for this product')
    }

    return this.prisma.reviews.create({
      data: {
        user_id,
        product_id,
        review_text: createReviewDto.review,
        rating: createReviewDto.rating
      }
    })
  }
}
