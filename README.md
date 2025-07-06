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

| No. | Technology/Framework/Library | Description                                     |
| --- | ---------------------------- | ----------------------------------------------- |
| 1   | Nx                           | Monorepo Orchestrator                           |
| 2   | NestJS                       | Backend framework                               |
| 3   | Prisma                       | Database ORM                                    |
| 4   | PassportJS                   | Library for implementing auth stratagies        |
| 5   | React Native                 | Cross Platform App Development Framework        |
| 6   | Expo                         | React Native Meta Framework for better DX       |
| 7   | Zod                          | Schema and type validation                      |
| 8   | Zustand                      | State Machine                                   |
| 9   | Tailwind CSS                 | CSS Utitlty Framework                           |
| 10  | Nativewind                   | Library to make Tailwind work with React Native |
