## Dev Repo for iiitt.ac.in

### About Project

This project was bootstrapped with [npx create-next-app my-app](https://github.com/facebook/create-react-app).
The project is targeted to revamp the old Official website of IIIT Trichy. The new website will have
advanced styling and interactive interface.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [MUI (optional)](https://mui.com/) - for UI components

## Project Structure

```bash
.
├── public/               # Static files
├── src/
│   ├── components/
│   ├── apps/
│   ├── utils/
│   └── types/
├── .dockerignore
├── .eslintrc.json
├── .prettierrc
├── Dockerfile
├── docker-compose.yml
├── next.config.js
├── package.json
└── tsconfig.json
```

### Installation and setup the project guidelines

### `Clone`

`gh repo clone helloworld-iiitt/iiitt.ac.in`

### `Setup for first time`

This command will install all necessary packages and add node_modules file.<br>
`npm install`

### `Run`

`npm  run dev ` <br>

## Docker Deployment

docker build -t iiitt-website . <br>
docker buildx build -t iiitt . (multi-platform image) <br>
docker run -p 3000:3000 iiitt-website<br>

### Contributing guidelines

The contribution will be considered only if it is needed and valid.
Adding new and innovative features are welcomed.

### Contributors<br>

[Fahad Israr](https://github.com/fahad-israr) <br>
[Dinesh Vikram](https://github.com/dinskid) <br>
[Nitish Kumar](https://github.com/thisisnitish) <br>
[Mayank Sonkar](https://github.com/mayank2021) <br>
[Sarthak Kumar](https://github.com/sarthak503) <br>
[Jagmohan Dixit](https://github.com/Jagmohan-Dixit) <br>
[Anurag Nandkumar Bansode](https://github.com/Anurag-Bansode)<br>
[Amogh G C](https://github.com/Amogh-GC)<br>
[Kuruva Pavani](https://github.com/kuruvapavani)<br>
[Pravas Mohanty](https://github.com/PravasMohanty) <br>

<!-- ## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right inyour project so you have full control over them. All of the commands except `eject` will still work, but they will point the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
 -->
