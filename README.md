# TrendCart Backend
> Powered by Nest.js and Prisma. The most typesafe backend you'll ever see.

## Postman Collection
The Postman collections includes sample responses.
[Click Here](https://www.postman.com/greatpinkshark/workspace/public/collection/18153423-c6f00462-13ff-44e1-9f33-8c04daab68c9?action=share&creator=18153423)
> [!IMPORTANT]  
> For login, you can pick a random email from the users table (by using Prisma Studio or PGAdmin) and use random letters as the password to login and receive the token. Then, use the token in your Requests by changing the "Authorization" to Bearer and the token to the response.

# Development

## 1. Setup
Installs the dependencies.
```bash
$ yarn
```

## 2. Docker (Optional) – For database setup.

If you're not using Docker, you can skip this step and setup your database manually. Mind that we're using PostgreSQL.

```bash
# start the container
$ docker-compose up -d
# Database URL: postgresql://postgres:postgres@localhost:5434/?schema=public
````

## 3. Fill the .env file
Yeah, it's important. Trust me. Also, avoid port 3000.
> [!NOTE]  
> If you're using docker (as shown in the previous step, you can use the following URL):

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5434/?schema=public
```

## 4. Sync Prisma to database and seed the db
This will create the tables and seed the database with some data.
```bash
$ yarn prisma db push # Syncs the Prisma schema to the database
$ yarn prisma db seed # Seeds the database (see seed.ts)
```

## 5. Start Prisma Studio
This will open a web interface to interact with the database. Think of it as a lightweight PGAdmin.
```bash
$ yarn prisma studio
```

## 5. Run the server
```bash
# watch mode
$ yarn run start:dev
```
