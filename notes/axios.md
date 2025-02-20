# Axios
A promise-based HTTP client for the browser and Node.js.  
Similar to the native `fetch` API but with additional features.  
A bit more heavy than `ofetch`.

## Basic usage
All requests returns promise, which needs to call `.then() -> .catch() ?-> .finally()` :
```typescript
import axios from "axios"

axios.get("https://jsonplaceholder.typicode.com/posts/1")
  .then(response => console.log(response.data))
  .catch(error => console.error(error))
  .finally(() => console.log("Request completed"))

// We can also use the method param inside the axios object :
axios({
  method: "get",
  url: "https://jsonplaceholder.typicode.com/posts/1"
})
  .then(response => console.log(response.data))
  .catch(error => console.error(error))
  .finally(() => console.log("Request completed"))
```
A cleaner way is to use `async/await`.

### Sending a GET request
```typescript
import axios from "axios"

async function fetchPost() {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1")
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}

await fetchPost()
```

### Sending a POST request
```typescript
async function createPost() {
  try {
    const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
      title: "Axios Guide",
      body: "This is a sample post",
      userId: 1
    })
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}

await createPost()
```

### Sending a PUT request (replace the entire resource)
```typescript
async function updatePost() {
  try {
    const response = await axios.put("https://jsonplaceholder.typicode.com/posts/1", {
      id: 1,
      title: "Updated Title",
      body: "Updated Body",
      userId: 1
    })
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}

await updatePost()
```

### Sending a PATCH request (update part of the resource)
```typescript
async function patchPost() {
  try {
    const response = await axios.patch("https://jsonplaceholder.typicode.com/posts/1", {
      title: "Updated Title"
    })
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}

await patchPost()
```

### Sending a DELETE request
```typescript
async function deletePost() {
  try {
    const response = await axios.delete("https://jsonplaceholder.typicode.com/posts/1")
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}

await deletePost()
```

## Sending custom headers
```typescript
const config = {
  headers: {
    Authorization: "Bearer token"
  }
}

axios.get("https://jsonplaceholder.typicode.com/posts/1", {
  title: "Axios Guide",
  body: "This is a sample post",
  userId: 1
}, config)
```

## Sending query parameters
```typescript
axios.get("https://jsonplaceholder.typicode.com/posts", {
  params: {
    userId: 1
  }
})
```

## Sending request body
```typescript
axios.post("https://jsonplaceholder.typicode.com/posts", {
  title: "Axios Guide",
  body: "This is a sample post",
  userId: 1
})
```

## Setting timeout
```typescript
axios.get("https://jsonplaceholder.typicode.com/posts", {
  timeout: 5000  // Timeout in milliseconds
})
```

## Setting default configuration (globals) and instances
```typescript
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com"
axios.defaults.headers.common["Authorization"] = "Bearer token"
axios.defaults.timeout = 5000  // Timeout in milliseconds

// Creating an instance of axios with custom configuration
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    Authorization: "Bearer token"
  },
  timeout: 5000
});
```

## Handling request errors
```typescript
async function fetchData() {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/invalid-url")
    console.log(response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error : ", error.message)
    }

    if (error.response) {
      // The server responded with something else than 2xx
      console.error("Response error : ", error.response.status, error.response.data)
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request error : ", error.request)
    } else {
      console.error("Unknown error : ", error.message)
    }
  }
}

await fetchData()
```

## Interceptors
Intercept requests or responses before they are handled by `.then()` or `.catch()`.

### Request interceptor
```typescript
axios.interceptors.request.use(config => {
  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at : ${new Date().toISOString()}`)

  return config
}, error => Promise.reject(error))
```

### Response interceptor
```typescript
axios.interceptors.response.use(response => {
  console.log(`Response received : ${response.status}`)

  return response
}, error => {
  console.error(`Response error : ${error.message}`)

  return Promise.reject(error)
})
```

## Transforming requests and responses
```typescript
async function createPost() {
  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/posts",
    data: {
      title: "Axios Guide",
      body: "This is a sample post",
      userId: 1
    },
    transformRequest: axios.defaults.transformRequest.concat(data => {
      data.title = data.title.toLowerCase()

      return data
    }),
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase()

      return data
    }),
    responseType: 'json'
  }

  try {
    const response = await axios(options)
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}

await createPost()
```

## Cancelling requests
```typescript
import axios, { CancelToken } from "axios"

const source = CancelToken.source()
await axios.get("https://jsonplaceholder.typicode.com/posts", { cancelToken: source.token })
  .then(response => console.log(response.data))
  .catch(thrown => {
    if (axios.isCancel(thrown)) {
      console.log("Request canceled", thrown.message)
    } else {
      console.error(thrown);
    }
  })

source.cancel("Operation canceled by the user.")
```

## Handling multiple requests
```typescript
import axios from "axios"

const request1 = axios.get("https://jsonplaceholder.typicode.com/posts/1")
const request2 = axios.get("https://jsonplaceholder.typicode.com/posts/2")

axios.all([request1, request2])
  .then(axios.spread((response1, response2) => {
    console.log(response1.data, response2.data)
  }))
  .catch(error => console.error(error))

// Cleaner
async function fetchPosts() {
  try {
    const [response1, response2] = await axios.all(
      [request1, request2]
    )
    console.log(response1.data, response2.data)
  } catch (error) {
    console.error(error)
  }
}

await fetchPosts()
```

## The `response` object
The `response` object contains the following properties (see https://axios-http.com/docs/res_schema) :
- `data`: The response data
- `status`: The HTTP status code
- `statusText`: The HTTP status text
- `headers`: The response headers
- `config`: The request configuration (including request headers)
- `request`: The request object

## The `error` object
The `error` object contains the following properties :
- `message`: The error message
- `response`: The response object (if available)
- `request`: The request object (if available)
- `config`: The request configuration
- `isAxiosError`: A boolean indicating if the error is an Axios error
- `toJSON()`: A method to convert the error to a JSON object

## The `config` object
The `config` object contains the following properties (see https://axios-http.com/docs/req_config) :
- `url`: The request URL
- `method`: The request method
- `baseURL`: The base URL (will be prepended to `url` unless `url` is absolute)
- `headers`: The request headers
- `params`: The request parameters
- `data`: The request body
- `timeout`: The request timeout
- `responseType`: The response type
- `maxRedirects`: The maximum number of redirects
- `auth`: The authentication credentials
- `proxy`: The proxy configuration
- `validateStatus`: A function to validate the response status code
- `transformRequest`: A function to transform the request data
- `transformResponse`: A function to transform the response data
- `onUploadProgress`: A function to handle upload progress

## Sources
- [Traversy Media - "Axios Crash Course | HTTP Library"](https://www.youtube.com/watch?v=6LyagkoRWYA)
