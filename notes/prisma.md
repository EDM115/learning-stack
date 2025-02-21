# Prisma
Prisma is a modern database toolkit for Node.js and TypeScript. It provides an intuitive ORM (Object-Relational Mapping) with auto-generated, type-safe queries.

## Folder structure
Prisma needs a `prisma` directory with a `schema.prisma` file.

## Database configuration
```prisma
// schema.prisma
generator client {
  provider = "prisma-client-js"
}

// Only one datasource is allowed
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```
The database must already exist, ex to create a PostgreSQL database :
```pwsh
psql -U postgres -c "CREATE DATABASE mydb"
```

## Models
Models are like tables in the database.
```prisma
model User {
  id     String  @id @default(uuid())
  name   String
  email  String  @unique
  uid    Int     @default(autoincrement())
  animal String? @db.VarChar(255)
}
```
All models must have an ID.

### All types
- `String`
- `Boolean`
- `Int`
- `BigInt`
- `Float`
- `Decimal`
- `DateTime`
- `Json`
- `Bytes`

### SQL equivalents cheatsheet
|           Prisma            |              SQL              |
| :-------------------------: | :---------------------------: |
|            `@id`            |         `PRIMARY KEY`         |
| `@default(autoincrement())` |           `SERIAL`            |
|     `@default(uuid())`      | `DEFAULT uuid_generate_v4()`  |
|      `@default(now())`      |  `DEFAULT CURRENT_TIMESTAMP`  |
|          `@unique`          |           `UNIQUE`            |
|         `@relation`         |         `FOREIGN KEY`         |
|        `@updatedAt`         | `ON UPDATE CURRENT_TIMESTAMP` |
|     `@db.VarChar(255)`      |        `VARCHAR(255)`         |
Fields are `NOT NULL` by default, use `?` to make them optional (ex `name String?`).  
Another modifier is `[]`, which makes the field an array (ex `posts Post[]`).

### Block level attributes
- `@@index([name, email])` : create an index on multiple fields
- `@@fulltext([name, email])` : create a fulltext index on multiple fields
- `@@unique([name, email])` : create a unique constraint on multiple fields (ex the name & email combo must be unique)
- `@@id([name, email])` : composite primary key, needs no separate `@id` attribute
- `@@map("users")` : map the model to a different table name
- `@@ignore` : ignore the model in migrations

## Migrations
A migration is a way to put the schema changes into the database.  
Also a version control system (hence the name).
```pwsh
npx prisma migrate dev --name init
```
It is always preferable over `npx prisma db push` which directly changes the db.

## Prisma Client usage
Import and instantiate Prisma Client :
```typescript
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
```
There must only be **one** instance of Prisma Client per database.

### Generate Prisma Client
The Prisma Client is a customized query builder for the database schema.
```pwsh
npx prisma generate
```
It needs to be run every time the schema changes.  
Migrations automatically run it.

### Create a record
```typescript
async function createUser() {
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
    },
  })
  console.log(user)
}
```
We can create directly nested records :
```typescript
async function createUserWithPosts() {
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
      posts: {
        create: {
          title: "First Post",
          content: "This is the content of the first post.",
        },
      },
    },
    include: { posts: true },
  })
  console.log(user)
}
```
Only get specific fields :
```typescript
async function createUserWithSpecificFields() {
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
    },
    select: {
      id: true,
      name: true,
      posts: {
        select: { id: true, title: true }
      }
    },
  })
  console.log(user)
}
```
Finally, we can create multiple
```typescript
async function createMultipleUsers() {
  const users = await prisma.user.createMany({
    data: [
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
      { name: "Charlie", email: "charlie@example.com" },
    ],
  })
  console.log(`${users.count} users created.`)  // Only count is returned
}
```

### Read and filter data
Find all records
```typescript
async function getUsers() {
  const users = await prisma.user.findMany()
  console.log(users)
}
```

Find one record
```typescript
async function getUniqueUser() {
  const user = await prisma.user.findUnique({
    where: { email: "alice@example.com" },
    distinct: ["name"],  // only return unique names
    take: 5,  // limit to 5 results
    skip: 2,  // skip the first 2 results
  })
  console.log(user)
}

// example with @@unique([name, email])
async function getUniqueUser() {
  const user = await prisma.user.findUnique({
    where: {
      name_email: {
        name: "Alice",
        email: "alice@example.com"
      }
    },
    select: { id: true, name: true },
  })
  console.log(user)
}
```

Find the first record
```typescript
async function getFirstUser() {
  const user = await prisma.user.findFirst({
    where: { name: "Alice" },
    orderBy: { createdAt: "desc" },
  })
  console.log(user)
}
```

Fulltext search (allows to search multiple words)
```typescript
async function getSomeUsers() {
  const users = await prisma.user.findMany({
    where: {
      name: { search: "Alice Bob" }
    }
  })
  console.log(users)
}
```

#### Clauses
```typescript
async function getSomeUsers() {
  const users = await prisma.user.findMany({
    where: {
      /* multiple conditions = AND clause, similar to :
      AND: [
        { name: "Alice" },
        { age: { gte: 18 } }
      ]
      */
      name: {
        // equals: "Alice",  // similar to what we did before
        in: ["Alice", "Bob", "Charlie"],
        notIn: ["Dave", "Eve"],
        startsWith: "A",
        endsWith: "e",
        contains: "li",
        not: {
          equals: "Alice",
          in: ["Bob", "Charlie"],
        },
      },
      age: {
        gte: 18,
        lte: 30,
        // lt & gt are also available
      },
    },
  })
  console.log(users)
}
```
```typescript
async function getSomeUsers() {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { name: "Alice" },
        { age: { gte: 18 } }
      ]
    }
  })
  console.log(users)
}
```
```typescript
async function getSomeUsers() {
  const users = await prisma.user.findMany({
    where: {
      NOT: [
        { name: "Alice" },
        { age: { gte: 18 } }
      ]
    }
  })
  console.log(users)
}
```

#### For One-to-Many relations
```typescript
async function getSomeUsers() {
  const users = await prisma.user.findMany({
    where: {
      posts: {
        some: { title: { contains: "Prisma" } },
        none: { title: { contains: "Test" } },
        every: { title: { contains: "Best" } },
      }
    }
  })
  console.log(users)
}
```
```typescript
async function getSomePosts() {
  const posts = await prisma.posts.findMany({
    where: {
      author: {
        is: { name: "Alice" },
        isNot: { name: "Bob" },
      }
    }
  })
  console.log(posts)
}
```

### Update a record
```typescript
async function updateUser(id: string) {
  const user = await prisma.user.update({
    where: { id },
    data: {
      name: "Updated Name",
      age: { increment: 1 }  // decrement, multiply, divide are also available
    },
  })
  console.log(user)
}
```
```typescript
async function updateUsers(name: string) {
  const user = await prisma.user.updateMany({
    where: { name },
    data: { animal: { set: ["cat"] } }
  })
  console.log(`${user.count} users updated.`)
}
```
Update existing nested records (`connect()` & `disconnect()` are also available in `prisma.table.create()`) :
```typescript
async function updateUserPosts(id: string) {
  const user = await prisma.user.update({
    where: { id },
    data: {
      posts: {
        connect: { id: "some-post-id" },
        // disconnect: { id: "some-post-id" },  // (or disconnect: true in One-to-One relations)
        // delete: { id: "some-post-id" },
        // update: { id: "some-post-id", title: "Updated Title" },
        // create: { title: "New Post", content: "This is a new post." },
      }
    },
    include: { posts: true },
  })
  console.log(user)
}
```

### Delete a record
```typescript
async function deleteUser(id: string) {
  await prisma.user.delete({ where: { id } })
  console.log(`User ${id} deleted.`)
}
```

## Relations
### One-to-Many
Example of a `Post` model related to `User` :
```prisma
model User {
  id    String @id @default(uuid())
  name  String
  email String @unique
  posts Post[]
}

model Post {
  id       String @id @default(uuid())
  title    String
  content  String
  author   User   @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId String
}
```
Different `onDelete` options :
- `Cascade` : delete all related records
- `SetNull` : set the foreign key to null
- `Restrict` : prevent deletion if there are related records
- `NoAction` : do nothing
- `SetDefault` : set the foreign key to a default value  
  
Querying an user with their posts :
```typescript
const userWithPosts = await prisma.user.findUnique({
  where: { id: "some-user-id" },
  include: { posts: true },
})
```
Disambiguating multiple One-to-Many relations :
```prisma
model User {
  id           String @id @default(uuid())
  name         String
  email        String @unique
  writtenPosts Post[] @relation("Author")
  likedPosts   Post[] @relation("Likes")
}

model Post {
  id        String  @id @default(uuid())
  title     String
  author    User    @relation("Author", fields: [authorId], references: [id])
  authorId  String
  likedBy   User?   @relation("Likes", fields: [likedById], references: [id])
  likedById String?
}
```

### Many-to-Many
Example of a `Post` model related to `Tag` :
```prisma
model Post {
  id    String @id @default(uuid())
  title String
  tags  Tag[]
}

model Tag {
  id    String @id @default(uuid())
  name  String
  posts Post[]
}
```
Prisma takes care of the join table.

### One-to-One
Example of a `User` model related to `Profile` :
```prisma
model User {
  id      String  @id @default(uuid())
  name    String
  email   String  @unique
  profile Profile?
}

model Profile {
  id     String @id @default(uuid())
  bio    String
  user   User   @relation(fields: [userId], references: [id])
  userId String @unique
}
```

## Enums
```prisma
enum Role {
  USER
  ADMIN
}

model User {
  id   String @id @default(uuid())
  name String
  role Role   @default(USER)
}
```

## Seeding the database
Create a `prisma/seed.ts` file :
```typescript
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
    },
  })
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
```
```pwsh
npx prisma db seed
```

## Transactions
To perform multiple operations at once :
```typescript
const [user, post] = await prisma.$transaction([
  prisma.user.create({ data: { name: "Alice", email: "alice@example.com" } }),
  prisma.post.create({ data: { title: "My First Post", authorId: "some-user-id" } })
])
```

## Middleware
```typescript
prisma.$use(async (params, next) => {
  console.log(`Query: ${params.model}.${params.action}`)
  return next(params)
})
```

## Deployment
```pwsh
npx prisma migrate deploy
```

## Sources
- [Web Dev Simplified - "Learn Prisma In 60 Minutes"](https://www.youtube.com/watch?v=RebA5J-rlwg)
