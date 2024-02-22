# Contribution Guide

## Introduction

This section aims to familiarise developers to the Fellowship Dashboard [[GitHub](https://github.com/polkadot-fellows/dashboard), [Demo](https://polkadot-fellows.github.io/dashboard)] for the purpose of contributing to the project.

## Major Packages Used

- React 18
- SCSS for theme configuration and Styled Components [[docs](https://styled-components.com/docs)] for component styling.
- [Polkadot UI component library](https://github.com/polkadot-ui)

## Environment Variables

Optionally apply the following environment variables in an environment file such as `.env` or with `yarn build` to customise the build of Polkadot Fellowship dashboard:

```
# display an organisation label in the network bar
VITE_ORGANISATION="© Polkadot Fellows"

# provide a privacy policy url in the network bar
VITE_PRIVACY_URL=https://github.com/polkadot-fellows/
```
