# learning-stack
## aka how to learn a new tech stack in ~~4~~ *2* weeks for my internship
React (Next.js), Fastify, Prisma, PostgreSQL and maybe InfluxDB

---

## Repo organization
- `backend/` : Fastify, Prisma, PostgreSQL
- `frontend/` : React (Next.js)
- `notes/` : Notes, helpful tips and learning remarks

## The project
Since I'm very original, this will be a Fitness Tracker.  
An application for tracking and analyzing fitness data, with features for storing workout logs, tracking nutritional intake, and viewing performance trends over time.
- **Frontend** : A `React` (`Next.js` with `TypeScript`) app using the pages router for navigation.
- **Backend** : A `Fastify` server to handle API requests.
- **Database** : `PostgreSQL` via `Prisma` to store user data, workout logs, nutrition information, and performance stats.
- **HTTP requests** : `Axios` for making client-side requests to the `Fastify` backend.
- **Metrics & Analytics** : InfluxDB to store and visualize time-series data such as step counts, heart rate trends, or calories burned over time.

### Features of the app :
- **User authentication** : Register and log in users using JWT-based authentication.
- **Workout tracking** : Users can log exercises with details like type, duration, and repetitions.
- **Nutritional logging** : Record daily meals, caloric intake, and macros.
- **Performance metrics** : InfluxDB stores time-series data (e.g., daily steps, calories burned, or weight progress).
- **Data visualization** : Charts or graphs for tracking workout and nutrition trends.
- **REST API** : The Fastify backend provides endpoints for user authentication, CRUD operations, and analytics retrieval.

---

## Plan
I was supposed to make it in 4 weeks, but life's not predictable and I'm left with 2 weeks to learn and implement this stack.

### Part 1
- Set up the project structure
- Learn TypeScript
  - Types
  - Interfaces
  - Generics
  - Integration with React
- Learn React and Next.js
  - Components
  - Props
  - State
  - Lifecycle
  - Next.js pages router
- Simple navigation between pages
- Display dynamic content with Axios (mock)
- Quick styling with Tailwind CSS
- Some components libraries (ex Chakra UI, shadcn/ui)
- Just the appearance for Login+Register, Workout logs, Nutrition tracking and Analytics dashboard

### Part 2
- Learn Fastify
  - Routes
  - Middleware
  - Plugins
  - Create an API for CRUD operations
- Fastify x PostgreSQL (mock)
- Learn Prisma
  - Schema creation
  - Migration
  - Seeding
  - Prisma Client
- JWT-based authentication
- Protect routes
- Implement the routes in the app

### Part 3
- More Prisma
  - Relations
  - Optimizations
  - Error handling
- InfluxDB basics + sample data
- Integrate InfluxDB with Fastify
- Charts to display the time-series data

### Part 4
- Better security practices
  - Token-based auth ?
- Fully functional workout and nutrition logging
- Seamless data flow
- Finish the analytics and metrics part
- Quick tests
- Deployment (maybe quick Docker)

---

## Run it
1) `git clone https://github.com/EDM115/learning-stack.git && cd learning-stack`
2) Have Node 23 and PostgreSQL installed
3) Create a `.env` file in the `backend/` folder and add the following variables :
```env
POSTGRES_USER=<username>
POSTGRES_PASSWORD=<password>
POSTGRES_DB=<database>
POSTGRES_PORT=5432
POSTGRES_HOST=localhost
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
JWT_SECRET=<secret>
```
The JWT can be generated with `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`.

### Dev
```pwsh
cd backend
npm run i
npm run prisma:seed
npm run prisma:migrate
npm run dev
```
```pwsh
cd frontend
npm run i
npm run dev
```

### Build
```pwsh
cd backend
npm run i
npm run build
npm run prisma:seed
npm run prisma:deploy
npm run start
```
```pwsh
cd frontend
npm run i
npm run build
npm run start
```

### Deploy
```pwsh
export $(grep -v '^#' backend/.env | xargs) && \
docker build \
  --build-arg POSTGRES_USER=$POSTGRES_USER \
  --build-arg POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  --build-arg POSTGRES_DB=$POSTGRES_DB \
  --build-arg POSTGRES_URL=$POSTGRES_URL \
  -t edm115/trackfit \
  .
docker run -d -p 56000:56000 -p 56001:56001 --env-file backend/.env --name trackfit edm115/trackfit
```
