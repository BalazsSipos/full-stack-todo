# TODO POC frontend

This is the frontend of the [TODO POC application](../README.md).

## Introduction

The frontend of the application is built using industry-standard technologies such as React, TypeScript and MUI for the UI components.

The application is deployed and hosted on [Vercel](https://vercel.com/), with the production environment accessible at [https://full-stack-todo-sepia.vercel.app/](https://full-stack-todo-sepia.vercel.app/).

## Available Scripts

### `npm start`

It will spin up a development server and start the app in development mode. It can be reached through [http://localhost:1234](http://localhost:1234) in the browser.

The server will automatically restart and the page will reload if you make edits in the code.

### `npm run build`

Builds the app for production to the `dist` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.
For more info see [https://parceljs.org/](https://parceljs.org/).

### Additional scripts

- `npm run format`: Formats the code using `prettier`.
- `npm run format:check`: Checks if the code is formatted correctly.
- `npm run eslint`: Runs `eslint` checks.
- `npm run tsc`: Runs the Typescript compilation.
- `npm run test`: Runs the tests.

## Deployment

The code is deployed and hosted by [Vercel](https://vercel.com).
Every time there is a commit from an author included in the Vercel dev team, it will get deployed automatically.
The deployed links can be found in comments of commits and pull requests.

## Tech stack

### App

| Dependency      | Role                                                    | Link                                                    |
| --------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| Typescript      | language                                                | https://www.typescriptlang.org/docs/handbook/intro.html |
| React           | UI framework                                            | https://reactjs.org/                                    |
| MUI             | Design and component framework                          | https://mui.com/                                        |
| react-router    | Routing                                                 | https://reactrouter.com/                                |
| react-query     | Server state management. Handles requests, caching etc. | https://tanstack.com/query/v4/                          |
| luxon           | Dates                                                   | https://moment.github.io/luxon/#/                       |
| firebase        | Authentication                                          | https://firebase.google.com/docs/auth                   |
| redux           | State management                                        | https://redux.js.org/                                   |
| class-validator | Validation                                              | https://github.com/typestack/class-validator            |

### Tooling

| Dependency | Role                                                           | Link                  |
| ---------- | -------------------------------------------------------------- | --------------------- |
| Parcel     | Bundling, optimizing, code-splitting, tree-shaking, dev server | https://parceljs.org/ |
| Prettier   | Formatting                                                     | https://prettier.io/  |
| Eslint     | Code Quality                                                   | https://eslint.org/   |
| Vitest     | Testing                                                        | https://vitest.dev/   |
