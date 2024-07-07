import { PrismaService } from '../src/prisma/prisma.service';
import axios from 'axios';

const prisma = new PrismaService();

const RECOMMENDER_API_URL = 'https://recommender-llm.onrender.com';

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
