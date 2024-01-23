# Full Stack open
### _My experience with the course_

Full Stack open is a free online web development program where you learn React, Redux, Node.js, MongoDB, GraphQL and TypeScript. This was my introduction to modern JavaScript-based web development. This document serves as a quick guide to setting up a React app using concepts learned from the course.

## Chapters

- [__Part 0__: Fundamentals of Web apps](#part-0-fundamentals-of-web-apps)
- [__Part 1__: Introduction to React](#part-1-introduction-to-react)
- [__Part 2__: Communicating with server](#part-2-communicating-with-a-server)
- [__Part 3__: Programming a server with NodeJS and Express](#part-3-programming-a-server-with-nodejs-and-express)
- __Part 4__: Testing Express servers, user administration
- __Part 5__: Testing React apps
- __Part 6__: Advanced state management
- __Part 7__: React router, custom hooks, styling app with CSS and webpack
- __Part 8__: GraphQL
- __Part 9__: TypeScript
- __Part 10__: React Native
- __Part 11__: CI/CD
- __Part 12__: Containers
- __Part 13__: Using relational databases

## __Part 0__: Fundamentals of Web apps

The concepts introduced here are very basic, so I'll go over each briefly in a table
| Concept | Explanation |
| ------ | ------ |
| HTTP GET | The fetching of a resource from a server. In HTTP protocol, the browser makes request to the server, which is then followed by a response from the server |
| Traditional Web Applications | The browser is "dumb", and only fetches HTML data from the server, while all aplication logic is run on the server |
| Event handlers and Callback functions | The application code does not invoke the functions itself, but the runtime environment - the browser, invokes the function at an appropriate time when the event has occurred |
| DOM | The implicit tree structure of an HTML document. The DOM can be manipulated from the console |
| Single page application | SPA-style websites don't fetch all of their pages separately from the server like our sample application does, but instead comprise only one HTML page fetched from the server, the contents of which are manipulated with JavaScript that executes in the browser |

These concepts are the bare minimum pre reqs for learning web development. We will start going more in depth in the following sections.

## __Part 1:__ Introduction to React
I'm not going to go over the basics of how React works, and I'll assume you already know JS and React syntax.

Start by creating a React project using Vite. 
```sh
npm create vite@latest <project name> -- --template react
```
I used to use create-react-app, but this method is now deprecated.
```sh
npx create-react-app <project name>
```
After finishing this course, I want to dive into Next.js instead of using Vite.

### Things to note
- Changes in state cause a component to re render. Make sure changes in the backend are reflected in the application state
- Hooks cannot be called from inside of a loop, a conditional expression, or any place that is not a function defining component.


## __Part 2:__ Communicating with a server
You can create a simple REST server using the [JSON Server](https://github.com/typicode/json-server) package. Create a *db.json* file to act as a mock database. JSON server automatically creates ids for new resources. Save it as a dev dependency since this is just a mock server to test requests made to the server from the front end.
```sh
npm i --save-dev json-server
json-server --port <port number> --watch db.json
```
In order to make requests to the server, import the [axios](https://www.npmjs.com/package/axios) package. [Axios](https://www.npmjs.com/package/axios) is a promise-based HTTP client for the browser and node.js.
```sh
npm i axios
```
These axios methods return promises. You can use the result by using the `then` method. Later on, we will switch to using `async/await` syntax.
```
const promise = axios.get('http://localhost:3000/foo')
promise.then(response => {
    console.log(response)
})

// using chaining
axios
    .get('http://localhost:3000/foo')
    .then(response => {
        const stuff = response.data
        console.log(stuff)
    })
```
A promise is an object that represents an asynchronous operation. A promise can have three distinct states:
- *pending*: the final value is not available yet
- *fulfilled*: the operation has been completed and the final value is available, which generally is a succesful operation
- *rejected*: An error prevented the final value from being determined, which generally represents a failed operation.

React's `useEffect` hook is a hook that lets you perform side effects on function components. What is a side effect?
> **Side Effect**
> any operation that modifies the state of the computer or interacts with the outside world, beyond returning a value in response to a function call. This could include modifying a global variable, changing the value of a function's arguments, making a network request, writing to a database, manipulating the DOM, and so on.

So, any operation that involves the outside world should be performed within a `useEffect` hook, like so:

```
let stuff
useEffect(() => {
    const response = axios.get('www.russel.com/api/bruh')
    stuff = response.data
}, [<dependencies>])
```

As a rule of thumb, and in respect to the *single responsibility principle*, we'll place the logic of communicating with the server in its own module located in the *src/services* directory. An example of how this might look is like so:

```
import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update }
```
Keep in mind that each resource should have its own associated service.

### Things to note
- When mapping through an array to create elements, try not to use the index as a key for the element
- The rejection of a promises must be handled gracefully. This is easy to do either with chaining the `catch` method if using the `then` syntax, or with a `try/catch` block if using `async/await` syntax.

## __Part 3:__ Programming a server with NodeJS and Express
Now we can start creating our own server instead of relying on the [JSON server](https://github.com/typicode/json-server) package.

Create a directory, then run 
```sh
npm init
```
A *package.json* file will automatically be created at the root of the directory with the following contents.
```
{
  "name": "backend",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Matti Luukkainen",
  "license": "MIT"
}
```

We will build our backend using [Express](https://expressjs.com/). In order for the express application to to parse JSON data sent in the request body, the [Express](https://expressjs.com/) app `const app = express()` must use the built in express json-parser middle ware like so: `app.use(express.json())`. When making requests, ensure that the `Content-Type` header is set to `application/json`.

### Important Dependencies
| Package  | Use  |
| ------ | ------ |
| [Express](https://expressjs.com/) | Used to create the backend application that can respond to requests made at different routes. The app is created like this: `const app = express()` |
| [Nodemon](https://github.com/remy/nodemon) | Save as a dev dependency. This package will watch files in the directory and will restart the application if any file changes are saved. This is only if the app is started using `nodemon index.js` instead of `node index.js` |
|  |  |

### Things to note
- Test requests made to your server by either using [Postman](https://www.postman.com/) or the VS Code [REST Client](https://github.com/Huachao/vscode-restclient)









