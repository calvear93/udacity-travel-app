# UDACITY'S TRAVEL APP

This is the fifth and last project for Udacity's Frontend Developer nanodegree.
It consists of a page for planning a travel to specific place and returns weather and info.

## IMPORTANT ⚠

Project uses [Geonames](https://www.geonames.org/), [Weatherbit](https://www.weatherbit.io/) and [Pixabay](https://pixabay.com/).
.env file isn't included but I define this file below.

## Structure 💡

```bash
├── README.md
├── LICENCE.md
├── REQUIREMENTS.md # achieved requirements
├── .vscode/ # visual code ideal settings
├── src/
│   ├── client/ # web app
│   └── server/ # NodeJS express server
├── .env # !!! this file isn't attached
├── .eslintrc.json # eslint config
├── .stylelint.json # stylelint config
├── babel.config.js # babel config
├── webpack.dev.js # webpack dev server config
├── webpack.prod.js # webpack production config
├── tsconfig.build.js # config for build
└── package.json
```

## Executing ⚙️

Project uses **npm scripts** for eases execution, testing and building.
Also this is using webpack.

Before execute the project, install npm dependencies with `npm i`.

| Command                 | Action                                     |
| ----------------------- | ------------------------------------------ |
| npm start               | starts nodejs server                       |
| npm run start-dev       | starts nodejs server in debug/watcher mode |
| npm run build-dev       | starts webpack dev server for web app      |
| npm run build-prod      | bundle the web app                         |
| npm run lint-analyze    | executes linter analysis                   |
| npm run lint-fix        | executes linter analysis and autofix       |
| npm run test-server     | executes jest unit tests for server        |
| npm run test-client     | executes jest unit tests for web app       |
| npm run build-and-start | builds the web app and executes the server |

You should create a .env file in project root, with the format below:

```bash
DEBUG=false
MOCK=false # true for use mock response in nodejs server
DATE_FORMAT=yyyy/MM/dd
GEONAMES_API_URL=http://api.geonames.org/searchJSON
GEONAMES_API_USERNAME=<your-user-name>
WEATHERBIT_API_URL=https://api.weatherbit.io/v2.0/forecast/daily
WEATHERBIT_TODAY_API_URL=https://api.weatherbit.io/v2.0/current
WEATHERBIT_API_KEY=<your-api-key>
PIXABAY_API_URL=https://pixabay.com/api/
PIXABAY_API_KEY=<your-api-key>
```

## Linting 🧿

Project uses two linters, for code formatting and code styling normalizing.

-   **eslint**: TypeScript linter with Airbnb React base config and some other additions.
-   **stylelint**: CSS/SASS linter.

For correct interpretation of linters, is recommended to use [Visual Studio Code](https://code.visualstudio.com/) as IDE and install Eslint plugin.

## Resources 📁

[Lottie Loader](https://lottiefiles.com/web-player?lottie_url=https%3A%2F%2Fassets3.lottiefiles.com%2Fpackages%2Flf20_cPIWGr.json)
[Adobe Spark](https://www.adobe.com/es/express/create/logo)

---

⌨ by Alvear Candia, Cristopher Alejandro <calvear93@gmail.com>
