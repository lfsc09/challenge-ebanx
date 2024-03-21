# challenge-ebanx

## Jest test anomalies

Random errors for not finding the account in `withdraw`, `transfer` are randomly occuring.
Although for each test case the environment is being reset.

## Install dependencies

```
npm install
```

### `package.json` scripts

-   `npm run test`: `jest`
-   `npm run build`: `rimraf ./build && tsc`
-   `npm run test-build`: `node build/main.js`
-   `npm run dev`: `npx nodemon`

### Extra config files

##### `jest.config.js`

File for configuring `jest` execution. (No modification)

-   Development only.

##### `nodemon.json`

Configuration file for nodemon to enable it using `ts-node` package for live updating typescript projects.

-   Development only.

##### `tsconfig.json`

Configuration file for typescript.

-   Development only.

## Building

```
npm run build
```

## Local run build

```
npm run test-build
```
