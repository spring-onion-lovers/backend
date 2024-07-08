import { PrismaService } from '../src/prisma/prisma.service';
import axios from 'axios';

const prisma = new PrismaService();

const RECOMMENDER_API_URL = 'https://recommender-llm.onrender.com';

/**
 * This API is used to insert all products into the recommender API
 */
export const insertBulkProductsIntoRecommenderApi = async () => {
  console.log('Getting Products');

  const products = await prisma.product.findMany({
    include: {
      Category: {
        select: {
          name: true,
        },
      },
    },
  });

  console.log('Products', products.length);
  console.log('Making Request');

  const reqBody = {
    products: products.map((p) => ({
      productId: p.product_id,
      name: p.name,
      description: p.description,
      category: p.Category.name,
    })),
  };

  console.log(JSON.stringify(reqBody, null, 2));

  const res = await axios.post(
    `${RECOMMENDER_API_URL}/api/v1/bulkProduct`,
    reqBody,
  );

  console.log('Request made');
  console.log('Status', res.status);
  console.log('Data', res.data);
};

/**
 * Sends all interactions to the recommender API (for seeding) in its required format
 */
export const insertBulkInteractionsIntoRecommenderApi = async () => {
  console.log('Getting all users');

  // Get all users
  const users = await prisma.user.findMany();

  const obj: Record<
    number,
    Array<{
      userId: number;
      interaction: string;
      productId: number;
    }>
  > = {};

  // For each user, get their interactions and add to obj
  for (const user of users) {
    const interactions = await prisma.interaction.findMany({
      where: {
        user_id: user.user_id,
      },
    });

    obj[user.user_id] = interactions.map((i) => ({
      userId: i.user_id,
      interaction: i.interaction,
      productId: i.product_id,
    }));
  }

  // For each user, make request
  for (const userId in obj) {
    console.log(`Making Request for ${userId}`);

    const reqBody = {
      userId: userId,
      userInteractions: obj[userId],
    };

    console.log(JSON.stringify(reqBody, null, 2));

    const res = await axios.post(`${RECOMMENDER_API_URL}/api/v1/user`, reqBody);

    console.log(`Request made for interactions for user ${userId}`);
    console.log('Status', res.status);
    console.log('Data', res.data);
  }

  console.log('All requests made');
};

export const insertSingleInteractionIntoRecommenderApi = async (data: {
  userId: number;
  interaction: string;
  productId: number;
}) => {
  try {
    console.log('Sending interaction to recommender API');

    const res = await axios.post(
      `${RECOMMENDER_API_URL}/api/v1/interaction`,
      data,
    );

    console.log('Interaction sent');
    console.log('Status', res.status);
    console.log('Data', res.data);
  } catch (error) {
    console.log('Error in sending interaction to recommender API');
    console.log('Error', error);
  }
};
