# markup-validator

Check the markup validity of HTML, CSS and SVG files using the W3C validator

![License: MIT](https://img.shields.io/github/license/webdevbynight/markup-validator)
[![ESM-only package](https://img.shields.io/badge/package-ESM--only-ffe536)](https://nodejs.org/api/esm.html)
[![Conventional Commits 1.0.0](https://img.shields.io/badge/Conventional_Commits-1.0.0-fe5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)
[![Released with release-change](https://img.shields.io/badge/Released_with-release--change-8d8d8d)](https://github.com/release-change/release-change)
![NPM latest version](https://img.shields.io/npm/v/markup-validator/latest)
![Node support](https://img.shields.io/node/v/markup-validator)
![Build status](https://img.shields.io/github/actions/workflow/status/webdevbynight/markup-validator/run-tests.yml)

**markup-validator** takes HTML, CSS and SVG files and returns detailed validation results.

## Installation

Install package for Node.js:
```
pnpm add --save-dev markup-validator
```
You can also install it using `npm`:
```
npm install --save-dev markup-validator
```

## Usage

```js
import { MarkupValidator } from "markup-validator";

const options = { files: ["docs/index.html"] };
const validator = new MarkupValidator(options);
const validate = await validator.validate();
```

### Options

##### files

Type: `array`

Specifies which files to be sent to validation. This option takes precedence over the other options.

##### paths

Type: `array`

Specifies which folders or files to be sent to validation. When omitted, all files are validated (skipping the `node_modules` folder), unless the `exclude` option is specified.

##### exclude

Type: `array`

Lists strings to match in paths to skip. When omitted, all files specified by `files` options if defined (all files otherwise) are validated (skipping the `node_modules` folder).

##### languages

Type: `array`  
Default: `["html", "css", "svg"]`

Specifies which languages to validate. When omitted, all languages are validated.

##### dryRun

Type: `boolean`  
Default: `false`

Bypasses the validation (for usage while building CI).

##### ignoreLevel

Type: `"info"`, `"warning"` or `null`  
Default: `null`

Skips unwanted messages. When set to `"warning"`, both the `"info"` level and the `"warning"` level are skipped.

## Get help

- [Stack Overflow](https://stackoverflow.com/questions/tagged/markup-validator)

## Copyright & licence

© 2026 Victor Brito — Released under the [MIT licence](./LICENSE).
