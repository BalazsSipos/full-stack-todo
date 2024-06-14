# TODO POC backend

This is the backend of the [TODO POC application](../README.md).

## Introduction

The backend of the application is built using industry-standard technologies such as Node js, Express and TypeScript.

The application is deployed and hosted on [Render](https://render.com/).

## Available Scripts

### `npm start`

It will spin up a development server and start the app in development mode. It can be reached through http://localhost:3000.

The server will automatically restart, if you make edits in the code.

### Additional scripts

- `npm run format`: Formats the code using `prettier`.
- `npm run format:check`: Checks if the code is formatted correctly.
- `npm run eslint`: Runs `eslint` checks.
- `npm run tsc`: Runs the Typescript compilation.
- `npm run test`: Runs the tests.

## Deployment

The code is deployed and hosted by [Render](https://render.com/).
Every time there is a commit, it will get deployed automatically.

## Tech stack

### App

| Dependency      | Role                   | Link                                                    |
| --------------- | ---------------------- | ------------------------------------------------------- |
| Typescript      | language               | https://www.typescriptlang.org/docs/handbook/intro.html |
| Node.js         | JS runtime environment | https://nodejs.org/                                     |
| Express         | Web framework          | https://expressjs.com/                                  |
| PostgreSQL      | Database               | https://www.postgresql.org/#/                           |
| TypeORM         | ORM                    | https://typeorm.io/                                     |
| luxon           | Dates                  | https://moment.github.io/luxon/#/                       |
| firebase        | Authentication         | https://firebase.google.com/docs/auth                   |
| class-validator | Validation             | https://github.com/typestack/class-validator            |

### Tooling

| Dependency | Role         | Link                 |
| ---------- | ------------ | -------------------- |
| Nodemon    | Dev server   | https://nodemon.io/  |
| Prettier   | Formatting   | https://prettier.io/ |
| Eslint     | Code Quality | https://eslint.org/  |
| Jest       | Testing      | https://jestjs.io/   |
