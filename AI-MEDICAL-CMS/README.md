# Content Management System (CMS)

## Usage

This Repository is used as headless CMS and could inject into ASP.NET Core Projects.

## Installation

Before project initialization, you are required:

- Node.js ([Downlaod](https://nodejs.org/en/download/))
- Command Line Interface

### `npm i` / `yarn install`

Install all required dependences.

## Configuration

Under root folder will provide `.example.env` file for the initial template.

`.example.env` required clone to a new file name as `.env.development` for development and `.env.production` for production.

This will provide a config for `Create React App (CRA)` and `CMS`.

For `CMS` all available configs is shown in `.example.env`.

For `Create React App (CRA)` all available configs could find in [here](https://create-react-app.dev/docs/advanced-configuration/).

### Append new config

For `CMS` configuration, all config needs a prefix `REACT_APP_` so config will be named as `REACT_APP_{{config}}`.

## Page structure
```jsx
import * as React from 'react';
import Promise from "bluebird";

// `shouldShowPanel` control whether should panel shown on page
export const shouldShowPanel = true;
// `requiredLogin` if the user does not sign in and save to auth context then will redirect to the login path
export const requiredLogin = false;
// `navigator` => NavigatorItem
// it allow to add shortcut to main panel left nav
export const navigator = {
    id: "...",
    title: "...",
    // fontawesome icon
    icon: "...",
    parent: "...",
    order: 0,
    matchExectPath: false,
}

const Page = () => {
    return (
        <div>hello world!</div>
    )
}

// `captureQueryParams` control what query should capture and listen change then rerender the page
Page.captureQueryParams = [];

// `initiator` allow to request before entry page
Page.initiator = () => new Promise(async (resolve, reject, onCancel) => {
    const controller = new AbortController();
    onCancel(() => controller.abort());
    try {
        const resp = await authFetch("<url>", { signal: controller.signal });
        if (!resp.ok) {
            return reject(new Error(resp.status));
        }
        resolve({
            props: await resp.json()
        });
    } catch (e) {
        reject(e);
    }
})

// JSX element must be export by default
export default Page;
```

## Project Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

Or about TypeScript, more on [TypeScript document](https://www.typescriptlang.org/).