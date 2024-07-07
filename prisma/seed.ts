// Country names object using 2-letter country codes to reference country name
// ISO 3166 Alpha-2 Format: [2 letter Country Code]: [Country Name]
// Sorted alphabetical by country name (special characters on bottom)

//https://gist.github.com/incredimike/1469814
import { PrismaService } from '../src/prisma/prisma.service';
import { fakeAddress, fakeUser } from './fake-data';
import { faker } from '@faker-js/faker';
import {
  insertBulkInteractionsIntoRecommenderApi,
  insertBulkProductsIntoRecommenderApi,
} from '../utilities/bindWithRecomenderApi';

const countryListAlpha2 = {
  AF: 'Afghanistan',
  AL: 'Albania',
  DZ: 'Algeria',
  AS: 'American Samoa',
  AD: 'Andorra',
  AO: 'Angola',
  AI: 'Anguilla',
  AQ: 'Antarctica',
  AG: 'Antigua and Barbuda',
  AR: 'Argentina',
  AM: 'Armenia',
  AW: 'Aruba',
  AU: 'Australia',
  AT: 'Austria',
  AZ: 'Azerbaijan',
  BS: 'Bahamas (the)',
  BH: 'Bahrain',
  BD: 'Bangladesh',
  BB: 'Barbados',
  BY: 'Belarus',
  BE: 'Belgium',
  BZ: 'Belize',
  BJ: 'Benin',
  BM: 'Bermuda',
  BT: 'Bhutan',
  BO: 'Bolivia (Plurinational State of)',
  BQ: 'Bonaire, Sint Eustatius and Saba',
  BA: 'Bosnia and Herzegovina',
  BW: 'Botswana',
  BV: 'Bouvet Island',
  BR: 'Brazil',
  IO: 'British Indian Ocean Territory (the)',
  BN: 'Brunei Darussalam',
  BG: 'Bulgaria',
  BF: 'Burkina Faso',
  BI: 'Burundi',
  CV: 'Cabo Verde',
  KH: 'Cambodia',
  CM: 'Cameroon',
  CA: 'Canada',
  KY: 'Cayman Islands (the)',
  CF: 'Central African Republic (the)',
  TD: 'Chad',
  CL: 'Chile',
  CN: 'China',
  CX: 'Christmas Island',
  CC: 'Cocos (Keeling) Islands (the)',
  CO: 'Colombia',
  KM: 'Comoros (the)',
  CD: 'Congo (the Democratic Republic of the)',
  CG: 'Congo (the)',
  CK: 'Cook Islands (the)',
  CR: 'Costa Rica',
  HR: 'Croatia',
  CU: 'Cuba',
  CW: 'Curaçao',
  CY: 'Cyprus',
  CZ: 'Czechia',
  CI: "Côte d'Ivoire",
  DK: 'Denmark',
  DJ: 'Djibouti',
  DM: 'Dominica',
  DO: 'Dominican Republic (the)',
  EC: 'Ecuador',
  EG: 'Egypt',
  SV: 'El Salvador',
  GQ: 'Equatorial Guinea',
  ER: 'Eritrea',
  EE: 'Estonia',
  SZ: 'Eswatini',
  ET: 'Ethiopia',
  FK: 'Falkland Islands (the) [Malvinas]',
  FO: 'Faroe Islands (the)',
  FJ: 'Fiji',
  FI: 'Finland',
  FR: 'France',
  GF: 'French Guiana',
  PF: 'French Polynesia',
  TF: 'French Southern Territories (the)',
  GA: 'Gabon',
  GM: 'Gambia (the)',
  GE: 'Georgia',
  DE: 'Germany',
  GH: 'Ghana',
  GI: 'Gibraltar',
  GR: 'Greece',
  GL: 'Greenland',
  GD: 'Grenada',
  GP: 'Guadeloupe',
  GU: 'Guam',
  GT: 'Guatemala',
  GG: 'Guernsey',
  GN: 'Guinea',
  GW: 'Guinea-Bissau',
  GY: 'Guyana',
  HT: 'Haiti',
  HM: 'Heard Island and McDonald Islands',
  VA: 'Holy See (the)',
  HN: 'Honduras',
  HK: 'Hong Kong',
  HU: 'Hungary',
  IS: 'Iceland',
  IN: 'India',
  ID: 'Indonesia',
  IR: 'Iran (Islamic Republic of)',
  IQ: 'Iraq',
  IE: 'Ireland',
  IM: 'Isle of Man',
  IL: 'Israel',
  IT: 'Italy',
  JM: 'Jamaica',
  JP: 'Japan',
  JE: 'Jersey',
  JO: 'Jordan',
  KZ: 'Kazakhstan',
  KE: 'Kenya',
  KI: 'Kiribati',
  KP: "Korea (the Democratic People's Republic of)",
  KR: 'Korea (the Republic of)',
  KW: 'Kuwait',
  KG: 'Kyrgyzstan',
  LA: "Lao People's Democratic Republic (the)",
  LV: 'Latvia',
  LB: 'Lebanon',
  LS: 'Lesotho',
  LR: 'Liberia',
  LY: 'Libya',
  LI: 'Liechtenstein',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  MO: 'Macao',
  MG: 'Madagascar',
  MW: 'Malawi',
  MY: 'Malaysia',
  MV: 'Maldives',
  ML: 'Mali',
  MT: 'Malta',
  MH: 'Marshall Islands (the)',
  MQ: 'Martinique',
  MR: 'Mauritania',
  MU: 'Mauritius',
  YT: 'Mayotte',
  MX: 'Mexico',
  FM: 'Micronesia (Federated States of)',
  MD: 'Moldova (the Republic of)',
  MC: 'Monaco',
  MN: 'Mongolia',
  ME: 'Montenegro',
  MS: 'Montserrat',
  MA: 'Morocco',
  MZ: 'Mozambique',
  MM: 'Myanmar',
  NA: 'Namibia',
  NR: 'Nauru',
  NP: 'Nepal',
  NL: 'Netherlands (the)',
  NC: 'New Caledonia',
  NZ: 'New Zealand',
  NI: 'Nicaragua',
  NE: 'Niger (the)',
  NG: 'Nigeria',
  NU: 'Niue',
  NF: 'Norfolk Island',
  MP: 'Northern Mariana Islands (the)',
  NO: 'Norway',
  OM: 'Oman',
  PK: 'Pakistan',
  PW: 'Palau',
  PS: 'Palestine, State of',
  PA: 'Panama',
  PG: 'Papua New Guinea',
  PY: 'Paraguay',
  PE: 'Peru',
  PH: 'Philippines (the)',
  PN: 'Pitcairn',
  PL: 'Poland',
  PT: 'Portugal',
  PR: 'Puerto Rico',
  QA: 'Qatar',
  MK: 'Republic of North Macedonia',
  RO: 'Romania',
  RU: 'Russian Federation (the)',
  RW: 'Rwanda',
  RE: 'Réunion',
  BL: 'Saint Barthélemy',
  SH: 'Saint Helena, Ascension and Tristan da Cunha',
  KN: 'Saint Kitts and Nevis',
  LC: 'Saint Lucia',
  MF: 'Saint Martin (French part)',
  PM: 'Saint Pierre and Miquelon',
  VC: 'Saint Vincent and the Grenadines',
  WS: 'Samoa',
  SM: 'San Marino',
  ST: 'Sao Tome and Principe',
  SA: 'Saudi Arabia',
  SN: 'Senegal',
  RS: 'Serbia',
  SC: 'Seychelles',
  SL: 'Sierra Leone',
  SG: 'Singapore',
  SX: 'Sint Maarten (Dutch part)',
  SK: 'Slovakia',
  SI: 'Slovenia',
  SB: 'Solomon Islands',
  SO: 'Somalia',
  ZA: 'South Africa',
  GS: 'South Georgia and the South Sandwich Islands',
  SS: 'South Sudan',
  ES: 'Spain',
  LK: 'Sri Lanka',
  SD: 'Sudan (the)',
  SR: 'Suriname',
  SJ: 'Svalbard and Jan Mayen',
  SE: 'Sweden',
  CH: 'Switzerland',
  SY: 'Syrian Arab Republic',
  TW: 'Taiwan',
  TJ: 'Tajikistan',
  TZ: 'Tanzania, United Republic of',
  TH: 'Thailand',
  TL: 'Timor-Leste',
  TG: 'Togo',
  TK: 'Tokelau',
  TO: 'Tonga',
  TT: 'Trinidad and Tobago',
  TN: 'Tunisia',
  TR: 'Turkey',
  TM: 'Turkmenistan',
  TC: 'Turks and Caicos Islands (the)',
  TV: 'Tuvalu',
  UG: 'Uganda',
  UA: 'Ukraine',
  AE: 'United Arab Emirates (the)',
  GB: 'United Kingdom of Great Britain and Northern Ireland (the)',
  UM: 'United States Minor Outlying Islands (the)',
  US: 'United States of America (the)',
  UY: 'Uruguay',
  UZ: 'Uzbekistan',
  VU: 'Vanuatu',
  VE: 'Venezuela (Bolivarian Republic of)',
  VN: 'Viet Nam',
  VG: 'Virgin Islands (British)',
  VI: 'Virgin Islands (U.S.)',
  WF: 'Wallis and Futuna',
  EH: 'Western Sahara',
  YE: 'Yemen',
  ZM: 'Zambia',
  ZW: 'Zimbabwe',
  AX: 'Åland Islands',
};

const product_categories = [
  'beauty',
  'fragrances',
  'furniture',
  'groceries',
  'electronics',
  'home appliances',
  'home entertainment',
  'home decoration',
  'kitchen accessories',
  'laptops',
  'mens shirts',
  'mens shoes',
  'mens watches',
  'mobile accessories',
  'motorcycle',
  'skin care',
  'smartphones',
  'sports accessories',
  'sunglasses',
  'tablets',
  'tops',
  'vehicle',
  'tools',
  'womens bags',
  'womens dresses',
  'womens jewellery',
  'womens shoes',
  'womens watches',
];

const prisma = new PrismaService();

async function insertIntoCountriesTable() {
  const insertArray = Object.keys(countryListAlpha2).map((countryCode) => {
    const countryName = countryListAlpha2[countryCode];
    return {
      country_code: countryCode,
      country_name: countryName,
    };
  });

  return prisma.country.createMany({
    data: insertArray,
    skipDuplicates: true,
  });
}

async function insertCategories() {
  return prisma.productCategory.createMany({
    data: product_categories.map((category) => ({ name: category })),
    skipDuplicates: true,
  });
}

async function insertUsers() {
  // Fetch all users
  const allUsers = await prisma.user.findMany();

  if (allUsers.length > 0) {
    console.log('Users already exist in the database. Not Inserting.');
    return;
  }

  const users = Array.from({ length: 10 }, () => {
    // Country_id (random number between 1 and 250)
    const country_id = Math.floor(Math.random() * 250) + 1;
    return {
      ...fakeUser(),
      name: faker.person.fullName(),
      country_id,
      Address: {
        create: {
          country_id,
          ...fakeAddress(),
        },
      },
    };
  });

  const promises = users.map((user) => {
    return prisma.user.create({
      data: {
        ...user,
      },
    });
  });

  return Promise.all(promises);
}

async function insertInteractions() {
  const allUsers = await prisma.user.findMany();
  const allProducts = await prisma.product.findMany();

  const interactionTypes = ['view', 'add_to_cart', 'purchase'] as const;

  const interactions = Array.from({ length: 100 }, () => {
    const randomUserId = Math.floor(Math.random() * allUsers.length);
    const randomProductId = Math.floor(Math.random() * allProducts.length);

    // random interaction type
    const interaction =
      interactionTypes[Math.floor(Math.random() * interactionTypes.length)];

    return {
      // interaction: faker.arrayElement(['view', 'add_to_cart', 'purchase']),
      user_id: allUsers[randomUserId].user_id,
      interaction: interaction,
      product_id: allProducts[randomProductId].product_id,
    };
  });

  const promises = interactions.map((interaction) => {
    return prisma.interaction.create({
      data: {
        ...interaction,
      },
    });
  });

  return Promise.all(promises);
}

async function insertProducts() {
  const NUMBERS_OF_PRODUCTS = 40;
  const allCategories = await prisma.productCategory.findMany();

  const arr = Array.from({ length: NUMBERS_OF_PRODUCTS }, () => {
    const randomCategoryId = Math.floor(Math.random() * allCategories.length);
    return prisma.product.create({
      data: {
        category_id: allCategories[randomCategoryId].category_id,
        currency: 'SGD',
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.number.float({ min: 1, max: 150, fractionDigits: 2 }),
        stock: 100,
        ProductImage: {
          create: {
            image_url: 'https://via.placeholder.com/150',
          },
        },
      },
    });
  });

  Promise.all(arr)
    .then(() => {
      console.log('Products inserted successfully');
    })
    .catch((error) => {
      console.error('Error inserting products', error);
    });
}

async function main() {
  try {
    console.log('[1] Inserting countries');
    await insertIntoCountriesTable();
    console.log('[1] Countries inserted successfully');

    console.log('[2] Inserting users');
    await insertUsers();
    console.log('[2] Users inserted successfully');

    console.log('[3] Inserting categories');
    await insertCategories();
    console.log('[3] Categories inserted successfully');

    console.log('[4] Inserting products');
    await insertProducts();
    console.log('[4] Products inserted successfully');

    console.log('[5] Inserting products into recommender API');
    await insertBulkProductsIntoRecommenderApi();
    console.log('[5] Products inserted into recommender API successfully');

    console.log('[6] Inserting interactions');
    await insertInteractions();
    console.log('[6] Interactions inserted successfully');

    console.log('[7] Inserting interactions');
    await insertBulkInteractionsIntoRecommenderApi();
    console.log('[7] Interactions inserted successfully');
  } catch (error) {
    console.error('Error inserting countries', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
