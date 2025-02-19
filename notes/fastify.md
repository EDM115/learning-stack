# Fastify

A fast and low overhead web framework for Node.js, kinda like Express but faster.  
Have a good ecosystem of plugins to extend its functionality.

## Basic Server
```typescript
import Fastify from "fastify"

const fastify = Fastify({ logger: true })

fastify.get("/", async (request, reply) => {
  reply.send({ message: "Hello, World!" })
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
    console.log("Server running on http://localhost:3000")
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
```

## Routes
```typescript
fastify.get("/items", async (request, reply) => {
  reply.send({ items: ["item1", "item2"] })
})

fastify.post("/data", async (request, reply) => {
  const { name } = request.body as { name: string }
  reply.send({ message: `Hello, ${name}!` })
})
```

### Route parameters
```typescript
fastify.get("/user/:id", async (request, reply) => {
  const { id } = request.params as { id: string };
  reply.send({ userId: id })
})
```

## Request validation with schema
```typescript
fastify.post(
  "/register",
  {
    schema: {
      body: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: { type: "string" },
          password: { type: "string" },
        },
      },
    },
  },
  async (request, reply) => {
    reply.send({ status: "User registered" })
  }
)
```
```typescript
const getUserOpts = {
  schema: {
    params: {
      type: "object",
      required: ["id"],
      properties: {
        id: { type: "number" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          userId: { type: "number" },
        },
      },
    },
  },
  handler: async function (request, reply) {
    const { id } = request.params as { id: number }
    reply.send({ userId: id })
  },
}

fastify.get("/user/:id", getUserOpts)
```

### Separate routes with data fetching logic with controllers
```typescript
// controllers/items.ts
import { v4 as uuidv4 } from "uuid"
let items = ["item1", "item2"]

export const getItems = async (request, reply) => {
  reply.send({ items })
}

export const addItem = async (request, reply) => {
  const { name } = request.body as { name: string }
  const returnedItem = {
    id: uuidv4(),
    name,
  }
  items = [...items, returnedItem]
  reply.code(201).send({ item: returnedItem })
}
```
```typescript
// routes/items.ts
import { getItems, addItem } from "../controllers/items"

const Item = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
}

const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Item,
      },
    },
  },
  handler: getItems,
}

const postItemOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          item: Item,
        },
      },
    },
  },
  handler: addItem,
}

export async function itemsRoute(fastify, options) {
  fastify.get("/items", getItemsOpts)
  fastify.post("/items", postItemOpts)
}
```
```typescript
// app.ts
import itemsRoute from "./routes/items"

fastify.register(itemsRoute)
```

## Middleware
```typescript
fastify.addHook("onRequest", async (request, reply) => {
  console.log(`Incoming request: ${request.method} ${request.url}`)
})
```

## Plugins
```typescript
import fastifyCors from "@fastify/cors"

fastify.register(fastifyCors, {
  origin: "*", // Allow all origins
})
```

### Register routes as plugins
```typescript
// routes/hello.ts

// Options allows to reduce the number of objects present in the response
// Ex : I can decide to not return name
// Also allows to change a type of an object (ex : number to string)
const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
            },
          }
        },
      },
    },
  },
}

// It's a good idea to extract an object property into aanother object if it's reused accross multiple schemas :
const Item = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
  },
}

async function helloRoute(fastify, options) {
  fastify.get("/hello", async (request, reply) => {
    reply.send({ message: "Hello, World!" })
  })

  fastify.get("/hello/items", getItemsOpts, async (request, reply) => {
    reply.send({ items: ["item1", "item2"] })
  })
}

export default helloRoute
```
```typescript
// app.ts
import helloRoute from "./routes/hello"

fastify.register(helloRoute)
```

### Swagger
```typescript
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUI from "@fastify/swagger-ui"

fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: "Fastify API",
      description: "API documentation",
      version: "0.1.0",
    },
  },
})

fastify.register(fastifySwaggerUI, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false
  },
})
```

### Static file serving
```typescript
import fastifyStatic from "@fastify/static"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

fastify.register(fastifyStatic, {
  root: join(__dirname, "public"),
})
```

### Database integration (ex Prisma)
```typescript
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

fastify.get("/users", async (request, reply) => {
  const users = await prisma.user.findMany()
  reply.send(users)
})
```

## Error handling
Custom error handling middleware :
```typescript
fastify.setErrorHandler((error, request, reply) => {
  reply.status(500).send({ error: "Internal Server Error" })
})
```

## Sources
- [Traversy Media - "Fastify Crash Course | Node.js Framework"](https://www.youtube.com/watch?v=Lk-uVEVGxOA)
- [TomDoesTech - "Learn Just Enough Fastify to be Productive"](https://www.youtube.com/watch?v=ZHLB4StAqPM)
- [TomDoesTech - "Build a RESTful API with Fastify, Prisma and TypeScript"](https://www.youtube.com/watch?v=LMoMHP44-xM)
