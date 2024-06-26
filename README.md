## Postman Collection

https://www.postman.com/greatpinkshark/workspace/public/collection/18153423-c6f00462-13ff-44e1-9f33-8c04daab68c9?action=share&creator=18153423

## Installation

```bash
$ yarn
```

## Fill the .env file

```env
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
```

## Running the app

```bash
# seed the database
$ yarn prisma db seed

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
