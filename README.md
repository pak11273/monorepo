# Scaffold a MONOREPO with this Node CLI

![npm (scoped)](https://img.shields.io/npm/v/@pak11273/monorepo)

## Build a monorepo with Lerna, Yarn Workspaces, and options for clients, servers, website, mobile

### Current Options:

- servers: "express"
- templating engines: "hbs", "ejs", "pug"
- clients: "react", "create-react-app 3.3.1"

### Features

- Custom options for a javascript-based fullstack repo
- Automatic github repository setup
- Adds a typescript option support for your client module
- Webpack dev server w/hot reloading for react apps

## Requirements

- [Lerna v3.18.4](https://lerna.js.org/)
- [Yarn v1.19.1](https://classic.yarnpkg.com/en/docs/install#windows-stable)
- [Node v12.4.0](http://nodejs.org/)
- [Git v2.11.0](https://git-scm.com/)
- [GitHub account](https://github.com/) OR [Bitbuck accout](https://bitbucket.org)
- [Create-react-app v3.3.1](https://create-react-app.dev/)

\*May or may not work with lower versions

## Installation Steps (if applicable)

1. Install the module globally with `npm install @pak11273/monorepo -g` from within the project directory
2. Create a directory `mkdir <your monorepo name> && cd <your monorepo name>`
3. Run `repo <your monorepo name> <description>`
4. Follow the instructions
5. cd into the root folder after the setup is completed and run `yarn bootstrap`
6. cd into shared package and run `yarn build`
7. cd into packages/client and run `yarn start` to test react clients

## Notes

- Frontend packages (eg. web, client, mobile) are installed with styled-components for styling. You can `yarn remove styled-components` inside each package to remove it and use your own css styling.

* Ports for packages:
  - web: 8080
  - client: 3000
  - server: 5000

## RoadMap

- ~~Add react option for client~~
- ~~Add a basic setup for react clients only~~
- ~~Add webpack option for bundler~~
- ~~Add create-react-app option for client~~
- Add a documentation website
- Add typeorm option for orms
- Add apollo option for graphql
- Add gatsby option for web
- ~~Add nextJS option for web~~
- Add rollup option for bundler
- Add nextJS option for client
- Add gatsby option for client
- Add react-native option for mobile
- Add create-react-native-app option for mobile
- Add basic user authentication for express
- Add basic user authentication for graphql
- Add github-actions option for ci
- Add circleci option for ci
- Add travisci option for ci
- Add knex option for orms
- Add sequelize option for orms
- Add relay option for graphql

## License

The MIT License (MIT)
