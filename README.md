# Arbio TODO

## Index

1. Development
2. Reasoning

## Development

### Setup

Before you start make sure you have the following installed on your machine

1. Docker
2. NodeJS 22.17.0 or later
3. Either XCode or Android Studio for emulating the Expo app. (Optional if you are using Expo Go on your device)

To run this project for local development start with cloning this repo.

```shell
git clone https://github.com/vikrrantshah/arbio.git
cd arbio
```

Because this project is a `Nx Monorepo` running following will install the node_modules for all the apps

```shell
npm install
```

We can make use of the `Nx CLI` for running different scripts in the project without cd-ing into each app.

You can do this by running

```shell
npx nx <your_command>
```

Or you can install Nx globally with a package manager of you choice. [(here)](https://nx.dev/getting-started/installation)
If you'd like to continue with `NPM` run

```shell
npm add --global nx
```

As you can see int the root folder there is the `docker-compose-dev.yml` file for the containers used in the project.
To start the docker containers run

```shell
docker compose -f docker-compose-dev.yml up -d
```

Run the following commands to setup the `Prisma` library and your database schema.

```shell
nx run db:generate-types && nx run db:migrate
// or `npx nx run db:generate-types && npx nx run db:migrate`
```

### Running projects

The easiest way to start development servers for all the apps is to run

```shell
nx run-many -t serve
```

This command will run the `serve` script in all the projects (where configured) in this case `auth`, `backend` and `todos-mobile` apps in parallel using the `Nx TUI`. [(Read more on Nx TUI)](https://nx.dev/blog/nx-21-terminal-ui)

> Note this command will start the Expo apps for web target which this project is not currently configured for, so you can close the browser app.

If you don't want to start the dev server for all the app or wish to run some script for an app you can do so by running

```
nx <script_target> <app_target> <options>
// for example: `nx start todos-mobile -c`
```

## Reasoning

This section will discuss the reasoning behind the technologies, frameworks and libraries used in this project.

| No. | Technology/Framework/Library | Description                                              |
| --- | ---------------------------- | -------------------------------------------------------- |
| 1   | Nx                           | Monorepo Orchestrator                                    |
| 2   | NestJS                       | Backend framework                                        |
| 3   | Prisma                       | Database ORM                                             |
| 4   | PassportJS                   | Library for implementing auth middlewares and stratagies |
| 5   | React Native                 | Cross Platform App Development Framework                 |
| 6   | Expo                         | React Native Meta Framework for better DX                |
| 7   | Zod                          | Schema and type validation                               |
| 8   | Zustand                      | State Machine                                            |
| 9   | Tailwind CSS                 | CSS Utitlty Framework                                    |

### 1. Nx Monorepo

- Nx is a Typescript-first Monorepo tool.
- Compared to other monorepo tools like npm, yarn or pnpm workspaces Nx is an overall monorepo orchestrator.
- Nx has a CLI for creating framework specific apps and libraries.
- Nx CLI is also very intuitive (similar to package.json) to setup custom scripts for an app or lib with project.json
- Nx has a TUI that can be used for running multiple dev server or scripts in parallel (So you don't need to deal will multiple terminals)

### 2. NestJS

- NestJS is a Typescript-first backend framework.
- Since it's Typescript we gain the benefits of e2e type safety, single language productivity and code sharing.
- Unlike other NodeJS backend frameworks NestJS has an OOP approach and a declarative code style.
- Because NestJS is an opinionated (or batteries-included) framework patterns like Middlewares, Pipes, Guards, Interceptors and more are built in the framework itself.
- NestJS also has a good set of first party recipies from OpenAPI docs to ORMs and more to go with the framework.

### 3. Prisma

- Is this most popular ORM in the Typescript ecosystem.
- Prisma's DSL is easy to understand and represents the schema in a SQL like structure.
- Prisma comes with the Prisma CLI that takes care or migrations, type generation and a explorer tool.
- NestJS has a first-party recipi for Prisma

### 4. PassportJS

- PassportJS is an easy to use middleware utility for implementing auth stratagies.
- NestJS has a first-party recipi for PassportJS (email-password and JWT).
- It's very easy to implement alternative or multi auth solution with PassportJS.

### 5. React Native

- React Native is the second most popular cross platform framework for mobile devices.
- React Native uses React (the most popular declarative web library) as it's way of declarative UI which makes it easier for Web developers to translate their skills and easy for hiring new engineers.
- React Native with Typescript gives the benefits of e2e type safety, single language productivity and code sharing.

### 6. Expo

- Expo is meta framework for React Native which provides much better DX.
- The Expo Go app make's it possible to easily test the app a physical device.
- Expo has cloud based build tools which helps in building App Store and Play Store ready artifacts.
- Expo provides OTA (Over the Air) Updates for non-native code i.e. No need to publish an app update the App UI will be updated by itself.
- Expo also has great support for React Native for Web.

### 7. Zod

- Zod is the most popular schema validation library in Typescript ecosystem.
- Zod is a Typescript-first validation library and it's easy to extract types from Zod Schema.

### 8. Zustand

- Zustand is a minimal state management library for React.
- It's easier to setup a Zustand store than to configure the React's Context API and other state management libraries like Redux.
- Unlike Context API or Redux Zustand does not require a Wrapper or Provider component to be mounted in the tree to provide the state.
- Zustand is 1.2kB minified and just 588B minified & gizipped

### 9. Tailwind CSS

- Unlike other UI libraries Tailwind provides a set of utility classes do develop your own design system.
- It's also very easy to customise to accommodate custom colors and animation
- With NativeWind we can use Tailwind with React Native
