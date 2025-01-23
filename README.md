# learning-stack
## aka how to learn a new tech stack in 4 weeks for my internship
React (Next.js), Fastify, Prisma, PostgreSQL and maybe InfluxDB

---

## Repo organization
- `backend/` : Fastify, Prisma, PostgreSQL
- `frontend/` : React (Next.js)
- `influxdb/` : InfluxDB
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
### Week 1
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

### Week 2
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

### Week 3
- More Prisma
  - Relations
  - Optimizations
  - Error handling
- InfluxDB basics + sample data
- Integrate InfluxDB with Fastify
- Charts to display the time-series data

### Week 4
- Better security practices
  - Token-based auth ?
- Fully functional workout and nutrition logging
- Seamless data flow
- Finish the analytics and metrics part
- Quick tests
- Deployment (maybe quick Docker)
